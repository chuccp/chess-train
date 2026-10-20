# 开发与部署

[← 回到 README](../README.md)

面向想改代码、跑测试或自行部署的人。普通使用只需要打开 [在线版](https://chuccp.github.io/chess-train/)。

## 环境

- Node.js 22.12+
- pnpm 11+
- 端到端测试需要本机 Chrome

## 本地运行

```bash
pnpm install

# 引擎二进制不提交到 Git；首次开发前拉取并校验固定版本
node tools/fetch-engine.mjs

pnpm dev
# http://127.0.0.1:5173
```

生产构建：

```bash
pnpm build
pnpm preview
# http://127.0.0.1:4173
```

> 离线能力依赖 HTTPS（localhost 例外）和 Service Worker。开发模式默认不注册 Service Worker，因此开发服务器上会显示“引擎已就绪 / 离线待确认”；用 `preview` 验证完整离线链路。

## 测试

```bash
pnpm test        # 规则核心 + 全部训练内容合法性
pnpm typecheck   # TypeScript
pnpm test:e2e    # 浏览器端到端（需要本机 Chrome；见 playwright.config.ts）
```

规则测试覆盖 FEN、UCCI、记谱、马腿、炮架、九宫、将帅照面、将死/困毙、自然限着和三次重复。

训练内容测试会检查：

- 残局 FEN 唯一，且不是完整开局/全局局面
- 残局每方棋子数量在合法上限内
- 残局主线合法，并以将死结束
- 杀法答案是否覆盖全部一步将死
- 开局着法序列是否重复
- 难度等级是否与计算规则一致
- 来源与许可元数据

端到端测试覆盖首页离线就绪、开局与 AI 应手、刷新恢复棋局、断网后继续浏览/对弈、训练答案、千条训练库的分页搜索和移动端无横向溢出。

## 目录

```text
apps/web/                 React + Vite + PWA 前端
  public/engine/          Pikafish Worker 适配器（静态 classic worker）
  public/engines/         固定版本引擎资源（Git 忽略，由脚本拉取）
  public/licenses/        GPL / NNUE / 第三方声明（随应用离线可用）
  src/                    UI、状态、引擎客户端、缓存、训练播放器
packages/xiangqi/         中国象棋规则核心（完整走法/终局/FEN/UCCI/记谱）
packages/content/         训练内容、schema、来源和自动校验
tools/                    引擎资源拉取、内容抓取与生成脚本
licenses/                 许可全文
docs/                     产品、开发与设计文档
```

## 引擎与离线

- 固定版本：`dev-20240226-98b20a33`（官方 Web 构建，单线程 WASM，约 4.6 MiB / 4.8 MB 引擎包）
- 资源 SHA-256 记录在 `apps/web/src/engine/manifest.ts` 和 `SOURCE-OFFER.md`
- 页面首次在线打开时自行下载到 Cache Storage；Service Worker 从同一缓存响应 Worker 的请求
- 只有资源全部缓存、哈希通过、UCI 握手和短搜索成功，才显示“离线就绪”
- 浏览器清理站点缓存后需要重新准备；清除数据不会假装仍然离线可用

## 部署

GitHub Pages 由 [`.github/workflows/pages.yml`](../.github/workflows/pages.yml) 自动构建和部署：

- 推送到 `main` 后，Actions 安装依赖、校验引擎包、运行单元测试、以 `/chess-train/` 为 base 构建
- 构建时生成 `404.html`（SPA 直达路由回退）和 `.nojekyll`
- 通过 GitHub Pages artifact 发布到 https://chuccp.github.io/chess-train/

其他静态托管需要 HTTPS、SPA 回退到 `index.html`，并在构建时设置正确 base；GitHub Pages 项目页必须使用 `/chess-train/`。

## 许可

棋练代码以 [GPL-3.0](../LICENSE) 发布。Pikafish 代码为 GPL-3.0；NNUE 权重遵循 Pikafish NNUE-License，免费使用、未经许可不得商业使用。本版本免费公开、非商业，不含广告、付费或赞助。

上游源码、构建与第三方声明见 [SOURCE-OFFER.md](../SOURCE-OFFER.md)、[licenses/THIRD_PARTY.md](../licenses/THIRD_PARTY.md) 和应用内 `/about` 页面。
