# Pikafish WASM mirror & provenance

The xiangqi app (`apps/xiangqi.ningh.org` in the app monorepo) runs
Pikafish — the Stockfish-family Chinese-chess engine, GPL-3.0 — fully in
the browser as single-threaded wasm. Nothing here is compiled by us: the
artifacts are the official web build served by **ai.pikafish.org** (the
Pikafish project's own online analysis board), mirrored verbatim and
pinned. They ship via this repository's Releases
(tag `pikafish-20240226`).

## What ships (pinned)

| file (release asset)        | local path in the app repo                          | sha256                                                             | size        |
| --------------------------- | --------------------------------------------------- | ------------------------------------------------------------------ | ----------- |
| `pikafish-single.js`        | `public/engines/pikafish/single/pikafish.js`        | `853b8b8489bb1f8b63b6ff39673f04ee2dbfc4009e732ed823dfa4f8033e9c3e` | 186,745 B   |
| `pikafish-single.wasm`      | `public/engines/pikafish/single/pikafish.wasm`      | `625dbdd6cb7717204ec25fa0fc5e4ba9f6278ab901a52294ff29b975302cd9f6` | 500,621 B   |
| `pikafish-single-simd.js`   | `public/engines/pikafish/single_simd/pikafish.js`   | `853b8b8489bb1f8b63b6ff39673f04ee2dbfc4009e732ed823dfa4f8033e9c3e` | 186,745 B   |
| `pikafish-single-simd.wasm` | `public/engines/pikafish/single_simd/pikafish.wasm` | `33931a6a0dde0179814d30ad59caa141f5b4797b31f2f558a878484dea8a7fbb` | 516,174 B   |
| `pikafish.data`             | `public/models/pikafish/pikafish.data`              | `d19746bb9eccbb8d65b5f7eaf9f5a9622a1ddde5847c12a0ef18afe864296ee2` | 4,103,914 B |

Provenance — mirrored verbatim from:

- `https://ai.pikafish.org/wasm/single_simd/pikafish.{js,wasm}`
- `https://ai.pikafish.org/wasm/single/pikafish.{js,wasm}`
- `https://ai.pikafish.org/wasm/data/pikafish.data`

Engine version string: `Pikafish dev-20240226-98b20a33`. The `.data` file is
an emscripten file-package (ZIP framing) containing the small
`pikafish.nnue` web net (4,970,696 B uncompressed). The glue exposes
`Module.send_command(text)` / `Module.read_stdout(line)` and auto-runs the
UCI loop; the app's worker (`public/engines/pikafish/worker.js` in the app
repo, hand-written and committed there) speaks that interface.

Update check: the engine reports its version in `id name` on `uci`; surface
changes here when re-pinning.

## Mirroring / re-pinning

The CI workflow's pikafish job does the mirroring: it downloads the five
official URLs below on a GitHub-hosted runner, verifies them against the
pinned sha256 table above, and attaches them to the Release. To re-pin a
newer official build: bump the table above, the checksum echoes in
`.github/workflows/build.yml`, and the tag (`pikafish-<yyyymmdd>`), then run
the workflow.

```bash
https://ai.pikafish.org/wasm/single/pikafish.js
https://ai.pikafish.org/wasm/single/pikafish.wasm
https://ai.pikafish.org/wasm/single_simd/pikafish.js
https://ai.pikafish.org/wasm/single_simd/pikafish.wasm
https://ai.pikafish.org/wasm/data/pikafish.data
```

Then refresh `tools/engines.json` in the app monorepo (tag, sha256, bytes).

## Licenses

- Engine: **GPL-3.0** (https://github.com/official-pikafish/Pikafish). We
  redistribute unmodified official binaries and link the source (this
  repository + upstream); the site's about text credits the project.
- NNUE weights: the Pikafish project releases nets under their
  **NNUE-License** (free use, commercial use requires permission). A free,
  non-commercial personal site is within the grant.

## Rebuilding from source (if the official mirror disappears)

The upstream repo keeps the wasm build targets (inherited from Stockfish's
Makefile: `ARCH=wasm32` / `wasm32-relaxed-simd`), but the official release
pipeline does not publish wasm artifacts — the ai.pikafish.org build is the
reference. To reproduce or upgrade from a newer tag:

```bash
git clone https://github.com/official-pikafish/Pikafish
cd Pikafish && git checkout <tag>
# macOS only: the Makefile injects Darwin-only flags into wasm builds —
# strip -arch / -mmacosx-version-min / -mdynamic-no-pic for the wasm target.
# Remove src/external/decompress/huf_decompress_amd64.S (amd64 asm) from the
# build, or compile that translation unit empty.
EM_LDFLAGS='-sINITIAL_MEMORY=64MB -sALLOW_MEMORY_GROWTH=1 -sSTACK_SIZE=4MB \
  -sFORCE_FILESYSTEM=1 -sEXPORTED_RUNTIME_METHODS=["FS","callMain"]' \
EM_CXXFLAGS='-msimd128' \
emmake make build ARCH=wasm32 COMP=gcc CXX=em++
```

Community reference build script with the macOS patches spelled out:
https://github.com/qq978262947/-_-/blob/main/scripts/build-pikafish-wasm.sh
(it also patches `uci.cpp`'s loop for `callMain` batch input; the official
web build instead exposes `send_command`/`read_stdout` as above — keep that
interface when rebuilding, the app worker depends on it).

The net ships separately: fetch the release NNUE for the matching engine
version and pack it as `pikafish.data`, or point `locateFile` at a plain
`pikafish.nnue` (the glue's file-package loader accepts either as long as
the FS path stays `/pikafish.nnue`).

## Why single-threaded

Threads would need SharedArrayBuffer, i.e. COOP/COEP response headers on
the whole origin — which in turn forces CORP handling onto every
cross-origin resource (analytics, fonts). Single-threaded wasm SIMD at
depth-capped levels is already far beyond human strength, so the play
experience pays nothing; analysis gets a movetime budget instead of cores.
