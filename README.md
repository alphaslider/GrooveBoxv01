# Gunmetal Sequencer
A high-performance, browser-based drum sequencer optimized for low-resource hardware.
## Architecture
- **Engine:** Built on the Web Audio API for sample-accurate timing.
- **Scheduler:** Uses a "Look-Ahead" loop (`requestAnimationFrame` + `AudioContext.currentTime`) to eliminate UI-thread jitter.
- **Audio:** Decodes `.wav` files directly into memory buffers to ensure zero-latency triggering.
## Features
- 16-step grid, 4-track support.
- Hardware-inspired "Gunmetal" aesthetic with LED gutter feedback.
- Lightweight: No frameworks, 100% Vanilla HTML5/CSS/JS.
## Why it's "Rock Solid"
Unlike standard `setInterval` approaches, this sequencer uses an independent hardware clock to schedule audio events, making it ideal for performance on mid-tier hardware (like Chromebooks).
My Memory Checkpoint
I have saved the following technical state in my custom memory:
Version: v0.4 (The "Golden" Version).
Core Logic: AudioBufferSourceNode + Look-Ahead Scheduler.
UI/UX: Compact grid with gutter LED indicators.
Status: Bug-free, ready for expansion.
