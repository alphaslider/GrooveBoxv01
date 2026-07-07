const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const trackSamples = [null, null, null, null];
let isPlaying = false, currentStep = 0, nextNoteTime = 0;

const container = document.getElementById('tracks-container');
const gutter = document.getElementById('gutter');

for(let i=0; i<16; i++) { 
    const l = document.createElement('div'); l.className = 'led'; gutter.appendChild(l); 
}

for (let t = 0; t < 4; t++) {
    const group = document.createElement('div'); group.className = 'track-group';
    const input = document.createElement('input'); input.type = 'file'; input.className = 'file-input';
    input.onchange = async (e) => {
        const file = e.target.files[0];
        const buffer = await file.arrayBuffer();
        trackSamples[t] = await audioCtx.decodeAudioData(buffer);
    };
    const grid = document.createElement('div'); grid.className = 'sequencer-grid';
    for (let s = 0; s < 16; s++) {
        const btn = document.createElement('button'); btn.className = 'rubber-button';
        btn.onclick = () => btn.classList.toggle('recessed');
        grid.appendChild(btn);
    }
    group.appendChild(input); group.appendChild(grid);
    container.appendChild(group);
}

function schedule() {
    while (nextNoteTime < audioCtx.currentTime + 0.1) {
        document.querySelectorAll('.led').forEach((led, i) => led.className = (i === currentStep) ? 'led active' : 'led');
        document.querySelectorAll('.track-group').forEach((group, tIdx) => {
            if (group.querySelectorAll('.rubber-button')[currentStep].classList.contains('recessed')) {
                triggerSample(tIdx, nextNoteTime);
            }
        });
        const bpm = document.getElementById('tempo').value;
        nextNoteTime += 60 / bpm / 4;
        currentStep = (currentStep + 1) % 16;
    }
    if (isPlaying) requestAnimationFrame(schedule);
}

function triggerSample(tIdx, time) {
    if (!trackSamples[tIdx]) return;
    const source = audioCtx.createBufferSource();
    source.buffer = trackSamples[tIdx];
    source.connect(audioCtx.destination);
    source.start(time);
}

document.getElementById('play-btn').onclick = () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        currentStep = 0; nextNoteTime = audioCtx.currentTime; schedule();
    }
};
