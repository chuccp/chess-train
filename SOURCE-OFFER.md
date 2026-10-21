# Source offer and engine provenance

Project: 棋练 / chess-train
Public build: https://chuccp.github.io/chess-train/
Release: V1 local single-player edition
Engine build in use: `dev-20240226-98b20a33` (Pikafish official web build, single-thread WebAssembly)

## Corresponding source

- Pikafish upstream repository: https://github.com/official-pikafish/Pikafish
- Pikafish web build mirror and provenance: https://github.com/ningh-o/engine-builds
- Pikafish web build release used by this project:
  https://github.com/ningh-o/engine-builds/releases/tag/pikafish-20240226
- NNUE weights repository and license: https://github.com/official-pikafish/Networks

The application source is this repository: https://github.com/chuccp/chess-train

The corresponding-source offer and build information will remain available for at least three years after the release of the pinned engine build. The application is distributed under GPL-3.0. The full license text is in `LICENSE` and `licenses/GPL-3.0.txt`.

## Engine assets

The app fetches these exact files into local Cache Storage and verifies their SHA-256 before use:

| File | Bytes | SHA-256 |
| --- | ---: | --- |
| pikafish-single.js | 186745 | 853b8b8489bb1f8b63b6ff39673f04ee2dbfc4009e732ed823dfa4f8033e9c3e |
| pikafish-single.wasm | 500621 | 625dbdd6cb7717204ec25fa0fc5e4ba9f6278ab901a52294ff29b975302cd9f6 |
| pikafish.data | 4103914 | d19746bb9eccbb8d65b5f7eaf9f5a9622a1ddde5847c12a0ef18afe864296ee2 |

The web app no longer bundles engine binaries: AI moves are computed by the auto-chess service (Pikafish NNUE on the server). Earlier builds shipped the WASM pack listed above; the files are not committed to Git and are no longer part of the web build.

## License obligations

- Pikafish code: GPL-3.0. Modified or unmodified binaries are distributed with the corresponding source offer above.
- NNUE weights: Pikafish NNUE-License, free non-commercial use. This release contains no advertising, paid content, sponsorship, or other commercial exploitation.
- The application code is GPL-3.0. Third-party UI dependencies retain their respective licenses; see `licenses/THIRD_PARTY.md`.

This is not legal advice. Anyone redistributing this project must independently satisfy the upstream licenses and applicable law.
