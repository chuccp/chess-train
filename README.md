# 棋练 · chess-train

**在线版：https://chuccp.github.io/chess-train/**

手机优先的网页单机中国象棋练习场（PWA）。和本机 Pikafish 对弈，练习杀法、残局定式和开局；首次完成引擎准备后，断网也能继续人机对弈。进度和棋谱只保存在本机。

- 产品与技术设计：[docs/DESIGN.md](docs/DESIGN.md)
- 许可、源码与第三方声明：[SOURCE-OFFER.md](SOURCE-OFFER.md)
- 本地开发与构建说明：本文件

## 已实现（V1）

- Pikafish 单线程 WebAssembly + NNUE，在 Web Worker 中本地运行
- 首次在线准备：下载 → SHA-256 校验 → UCI 握手 → 短搜索自检 → “离线就绪”
- PWA 离线：应用壳、训练内容和引擎资源全部走本机缓存
- 人机对弈：执红/执黑、入门/进阶/挑战、悔棋、提示、认输、自动保存
- 对局中可“换边重开”：确认后改执另一色并新开一局，换边执黑时 Pikafish 自动先走
- 三档难度通过 Pikafish `UCI_LimitStrength` / `UCI_Elo` 和思考时间控制
- 杀法训练：20 道原创一步杀，支持提示、答案和错题统计
- 残局定式：6 节残局演示；任何将死都算完成，找到更短杀法也会被识别
- 开局训练：3 套常见开局主线
- 跟练课程偏离主线后先自由走子；本关步数用完后仍偏离才提示“挑战失败”，本次不计完成
- 棋谱：本地保存、列表、回放、逐手跳转
- 响应式 SVG 棋盘、移动端底部导航、键盘落子、屏幕阅读器标签
- 移动端游戏优先：首页直接展示棋盘与开始/继续对局，对局页隐藏全局页头并全宽显示棋盘
- 轻量动效：落子移动、选中呼吸、合法点、最后一步、提示箭头、结果与成功操作栏，均尊重系统“减少动态效果”设置
- 桌面布局：对局和训练的操作按钮位于棋盘右侧，1080p 全屏下无需滚动即可操作
- GPL-3.0 发布，附 Pikafish/NNUE 许可、源码与构建信息

## 本地运行

要求 Node.js 22.12+、pnpm 11+。

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

规则测试覆盖 FEN、UCCI、记谱、马腿、炮架、九宫、将帅照面、将死/困毙、自然限着和三次重复。训练内容为原创编排，训练数据与说明文字以 CC0-1.0 公开。

端到端测试覆盖：首页离线就绪、开局与 AI 应手、刷新恢复棋局、断网后继续浏览/对弈、训练答案和移动端无横向溢出。

## 目录

```text
apps/web/                 React + Vite + PWA 前端
  public/engine/          Pikafish Worker 适配器（静态 classic worker）
  public/engines/         固定版本引擎资源（Git 忽略，由 scripts 拉取）
  public/licenses/        GPL / NNUE / 第三方声明（随应用离线可用）
  src/                    UI、状态、引擎客户端、缓存、训练播放器
packages/xiangqi/         中国象棋规则核心（完整走法/终局/FEN/UCCI/记谱）
packages/content/         训练内容与 schema、自动生成并校验的题目
tools/                    引擎资源拉取、训练内容生成脚本
licenses/                 许可全文
docs/                     产品与技术设计
```

## 引擎与离线

- 固定版本：`dev-20240226-98b20a33`（官方 Web 构建，单线程 WASM，约 4.6 MiB / 4.8 MB 引擎包）
- 资源 SHA-256 记录在 `apps/web/src/engine/manifest.ts` 和 `SOURCE-OFFER.md`
- 页面首次在线打开时自行下载到 Cache Storage；Service Worker 从同一缓存响应 Worker 的请求
- 只有资源全部缓存、哈希通过、UCI 握手和短搜索成功，才显示“离线就绪”
- 浏览器清理站点缓存后需要重新准备；清除数据不会假装仍然离线可用

## 部署

GitHub Pages 由 [`.github/workflows/pages.yml`](.github/workflows/pages.yml) 自动构建和部署：

- 推送到 `main` 后，Actions 安装依赖、校验引擎包、运行单元测试、以 `/chess-train/` 为 base 构建
- 构建时生成 `404.html`（SPA 直达路由回退）和 `.nojekyll`
- 通过 GitHub Pages artifact 发布到 https://chuccp.github.io/chess-train/

本地生产构建仍可输出到 `apps/web/dist/`：

```bash
pnpm build
pnpm preview
```

其他静态托管需要 HTTPS、SPA 回退到 `index.html`，并在构建时设置正确 base；GitHub Pages 项目页必须使用 `/chess-train/`。

## 许可

棋练代码以 [GPL-3.0](LICENSE) 发布。Pikafish 代码为 GPL-3.0；NNUE 权重遵循 Pikafish NNUE-License，免费使用、未经许可不得商业使用。本版本免费公开、非商业，不含广告、付费或赞助。

上游源码、构建与第三方声明见 [SOURCE-OFFER.md](SOURCE-OFFER.md)、[licenses/THIRD_PARTY.md](licenses/THIRD_PARTY.md) 和应用内 `/about` 页面。
