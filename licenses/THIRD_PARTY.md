# Third-party notices

棋练 is distributed under GPL-3.0. The following components are used in the V1 build.

## ElephantEye

- Project: ElephantEye (象眼), a UCCI Xiangqi engine by Morning Yellow.
- Source: https://github.com/xqbase/eleeye
- License: GNU Lesser General Public License v2.1. Full text: `LGPL-2.1.txt`.
- Embedded build: `eleeye.wasm` and `eleeye.js` from
  https://github.com/billzi2016/Chinese-Chess-AI at commit
  `70faa60e20eb1ae6174a2f110b5a8ef6d989dc4a`.
- SHA-256: `eleeye.wasm`
  `64cfbedac85b1cc80bcb145b2451d2894690605414d0b32e8e4ac8d25c157559`;
  `eleeye.js` `a2e3ca8934f289316df02dfe7a626ec330b3c95708bb573be98c6e091f6c0440`.
- The browser Worker adapter is part of this project. No `BOOK.DAT` opening book is bundled.

## Pikafish

- Project: Pikafish, a Xiangqi engine derived from Stockfish.
- Source: https://github.com/official-pikafish/Pikafish
- License: GNU GPL v3.0.
- Runtime: server-side Pikafish interface. No Pikafish binary or NNUE weights are bundled or downloaded by the web app.
- Corresponding source and service information: see `SOURCE-OFFER.md`.

## Pikafish NNUE weights

- Source: https://github.com/official-pikafish/Networks
- License: Pikafish NNUE-License. Free use; no commercial use without permission.
- Runtime: used by the server-side Pikafish service, not included in the browser bundle.

## Application libraries

| Package | License |
| --- | --- |
| React / React DOM | MIT |
| React Router | MIT |
| Zustand | MIT |
| idb | ISC |
| lucide-react | ISC |
| Vite / vite-plugin-pwa / Workbox | MIT |
| TypeScript | Apache-2.0 |

The package lockfile records exact versions. No external runtime CDN is required.

## Training content

The starter tactics, guided endgame lines, opening lessons and explanatory text are original project work dedicated to the public domain under CC0 1.0. See `licenses/CONTENT-CC0.md`. They are not covered by the Pikafish licenses.

## Fonts and artwork

The V1 interface uses system Chinese serif/sans-serif fonts and original CSS/SVG board artwork. The PWA icon is original artwork generated for this project. No third-party board image or piece font is bundled.
