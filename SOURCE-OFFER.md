# Source offer and engine provenance

Project: 棋练 / chess-train
Public build: https://chuccp.github.io/chess-train/
Release: V1 local single-player edition
Online Xiangqi AI interface: Pikafish NNUE service at `https://home.usercao.com/auto-chess/api/v1`

## Corresponding source

- Pikafish upstream repository: https://github.com/official-pikafish/Pikafish
- Pikafish web build mirror and provenance: https://github.com/ningh-o/engine-builds
- Pikafish web build release used by this project:
  https://github.com/ningh-o/engine-builds/releases/tag/pikafish-20240226
- NNUE weights repository and license: https://github.com/official-pikafish/Networks
- ElephantEye upstream source: https://github.com/xqbase/eleeye
- ElephantEye WASM build reference: https://github.com/billzi2016/Chinese-Chess-AI
- ElephantEye build commit: `70faa60e20eb1ae6174a2f110b5a8ef6d989dc4a`

The application source is this repository: https://github.com/chuccp/chess-train

The corresponding-source offer and build information will remain available for at least three years after the release of the pinned engine build. The application is distributed under GPL-3.0. The full license text is in `LICENSE` and `licenses/GPL-3.0.txt`.

## Engine assets

Pikafish runs behind the online AI interface; the browser bundle contains no Pikafish or NNUE files.

The current build additionally bundles ElephantEye as the local training-branch engine:

| File | Bytes | SHA-256 |
| --- | ---: | --- |
| eleeye.js | 68695 | a2e3ca8934f289316df02dfe7a626ec330b3c95708bb573be98c6e091f6c0440 |
| eleeye.wasm | 109148 | 64cfbedac85b1cc80bcb145b2451d2894690605414d0b32e8e4ac8d25c157559 |

No ElephantEye opening book (`BOOK.DAT`) is bundled. The Web Worker adapter is project code.

## License obligations

- Pikafish code: GPL-3.0. Modified or unmodified binaries are distributed with the corresponding source offer above.
- NNUE weights: Pikafish NNUE-License, free non-commercial use. This release contains no advertising, paid content, sponsorship, or other commercial exploitation.
- ElephantEye: LGPL-2.1. Source and build provenance are linked above; the full license text is in `licenses/LGPL-2.1.txt`.
- The application code is GPL-3.0. Third-party UI dependencies retain their respective licenses; see `licenses/THIRD_PARTY.md`.

This is not legal advice. Anyone redistributing this project must independently satisfy the upstream licenses and applicable law.
