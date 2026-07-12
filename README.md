# NOVA — AI Voice Console

A futuristic, holographic text-to-speech interface built with **React + Vite + TypeScript + Tailwind CSS + Framer Motion**, using the browser's native `SpeechSynthesis` API.

> **Note on naming:** this was inspired by the JARVIS-style "AI operating system" aesthetic from Iron Man, but is branded as an original assistant ("NOVA") rather than using Marvel's trademarked character name.

## Features

- Unlimited-length text input, no artificial character cap
- **Document upload**: drag-and-drop or click-to-browse `.txt`, `.md`, `.docx`, and `.pdf` files — text is extracted automatically and loaded into the editor
- **Teleprompter-style read-along**: NOVA speaks sentence-by-sentence with natural pauses at punctuation (longer after `. ! ?`, shorter after `, ; :`) instead of a flat monotone blast. Visually, the just-finished sentence fades up and out, the current sentence is spotlighted with live word-by-word highlighting, and the next sentence waits faintly below — the same "focused, flowing" feel as Claude's own voice mode.
- Multi-voice selector (uses whatever voices your OS/browser exposes)
- Speed, pitch, and volume controls
- Play / Pause / Resume / Stop transport
- Copy and clear buttons
- Local history with favorites, stored in `localStorage`
- Keyboard shortcuts (Space, P, Esc, ⌘/Ctrl+S, ⌘/Ctrl+D)
- Animated holographic HUD: rotating rings, pulsing mic, reactive equalizer
- Floating particle field + animated grid background
- Glassmorphism panels throughout
- Decorative animated "system diagnostics" widgets (CPU/Memory/Network — cosmetic only, not real system data)
- Live clock + AI status indicator
- One-time spoken greeting on first visit
- Fully responsive, keyboard-accessible

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (typically `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/       Reusable UI pieces (HUD circle, equalizer, panels, controls, etc.)
  hooks/             useSpeech (SpeechSynthesis wrapper), useLocalStorage, useClock
  types/             Shared TypeScript interfaces
  App.tsx            Top-level layout and state orchestration
  main.tsx           React entry point
  index.css          Tailwind directives + custom glass/neon utility classes
```

## Notes on the Speech API

- Available voices differ by OS and browser (Chrome, Edge, and Safari all expose different voice lists). NOVA lists whatever `speechSynthesis.getVoices()` returns on your machine.
- Directly exporting spoken audio to MP3/WAV isn't possible with the browser `SpeechSynthesis` API alone — it only plays audio, it doesn't expose the underlying audio stream. Doing that would require a server-side TTS engine (e.g. an API-based voice model) to generate a downloadable audio file. The UI has room to add a "Download" action once such a backend is wired in.
- Everything else — history, favorites, settings — is stored only in your browser's `localStorage`; nothing is sent anywhere.

## Notes on document upload & the reading experience

- **PDF**: text is extracted via `pdfjs-dist`. Scanned/image-only PDFs with no embedded text layer won't extract anything — that would need OCR, which isn't included.
- **DOCX**: text is extracted via `mammoth`, which pulls plain text and drops most formatting (by design, since the goal is speech, not layout).
- **Sentence pacing**: text is split into sentences with `Intl.Segmenter` (falling back to a punctuation regex where unsupported), and each sentence is spoken as its own utterance with a short natural pause afterward — longer after `.`/`!`/`?`, shorter after `,`/`;`/`:`. This avoids the flat, run-on cadence you get from speaking an entire block as one utterance.
- **Word-level highlighting** relies on the browser firing `SpeechSynthesisUtterance` `boundary` events, now scoped per-sentence. Chrome and Edge support word-level boundaries well; some browsers/voices (notably certain Safari/mobile voices) only fire sentence-level boundaries or none at all — the current sentence will still advance and spotlight correctly, just without the inner word highlight.
- Both document parsers are loaded via dynamic `import()` so they don't bloat the initial page load — they're only fetched when you actually upload a matching file.

## Accessibility

- All interactive controls have `aria-label`s and visible focus rings.
- Keyboard shortcuts avoid hijacking Space/Backspace while you're typing in the textarea.
- Respects `prefers-reduced-motion` by shortening/disabling decorative animations.
