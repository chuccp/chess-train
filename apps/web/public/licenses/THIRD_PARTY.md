# Third-party notices

棋练 is distributed under GPL-3.0. The following components are used in the V1 build.

## Pikafish

- Project: Pikafish, a Xiangqi engine derived from Stockfish.
- Source: https://github.com/official-pikafish/Pikafish
- License: GNU GPL v3.0.
- Web build used: `dev-20240226-98b20a33`, mirrored with provenance by https://github.com/ningh-o/engine-builds.
- Corresponding source and build information: see `SOURCE-OFFER.md`.

## Pikafish NNUE weights

- Source: https://github.com/official-pikafish/Networks
- License: Pikafish NNUE-License. Free use; no commercial use without permission.
- The pack is cached locally and loaded by Pikafish inside a Web Worker.

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
