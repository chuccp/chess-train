import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  Cpu,
  ExternalLink,
  Heart,
  ShieldCheck,
  WifiOff,
} from 'lucide-react';
import { ENGINE_ASSETS, ENGINE_VERSION, engineTotalBytes } from '../engine/manifest';
import { formatBytes } from '../lib/format';

const external = { target: '_blank', rel: 'noreferrer noopener' } as const;
const baseUrl = import.meta.env.BASE_URL;

export function AboutPage() {
  return (
    <div className="page about-page">
      <Link to="/settings" className="back-link">
        <ArrowLeft size={15} aria-hidden="true" />
        设置
      </Link>

      <section className="about-hero">
        <div className="about-seal" aria-hidden="true">棋</div>
        <div>
          <div className="eyebrow">关于棋练</div>
          <h1>一个安静的单机象棋练习场</h1>
          <p>
            棋练把对弈、杀法、残局和开局放在一张棋桌上。没有账号、匹配、排行榜或对局服务器；
            棋局与训练进度留在本机。
          </p>
        </div>
      </section>

      <div className="about-grid">
        <section className="panel about-section">
          <div className="about-icon"><Cpu size={22} aria-hidden="true" /></div>
          <div>
            <span className="eyebrow">引擎</span>
            <h2>Pikafish，本地运行</h2>
            <p>
              V1 使用 Pikafish 单线程 WebAssembly + NNUE，在浏览器 Web Worker 中计算。
              首次在线打开时下载并校验 {ENGINE_ASSETS.length} 个文件（约 {formatBytes(engineTotalBytes())}），
              自检成功后才标记为离线就绪。
            </p>
            <dl className="info-list">
              <div><dt>构建</dt><dd>{ENGINE_VERSION}</dd></div>
              <div><dt>协议</dt><dd>UCI</dd></div>
              <div><dt>运行</dt><dd>本地 Worker · 无服务端</dd></div>
            </dl>
          </div>
        </section>

        <section className="panel about-section">
          <div className="about-icon"><WifiOff size={22} aria-hidden="true" /></div>
          <div>
            <span className="eyebrow">离线</span>
            <h2>首次准备后，断网也能下</h2>
            <p>
              应用壳、训练内容、引擎和 NNUE 都保存在浏览器缓存中。首次准备完成后，关闭浏览器、断网再打开，
              仍可完成人机对弈。浏览器或系统清理站点缓存后，需要重新准备。
            </p>
            <p className="fine-print">
              “离线就绪”只在下载、哈希校验、引擎加载和短搜索都通过后显示；在此之前不会假装可用。
            </p>
          </div>
        </section>

        <section className="panel about-section" id="licenses">
          <div className="about-icon"><BookOpen size={22} aria-hidden="true" /></div>
          <div>
            <span className="eyebrow">许可</span>
            <h2>开源与第三方声明</h2>
            <p>
              棋练代码以 <strong>GPL-3.0</strong> 发布。Pikafish 代码同为 GPL-3.0；
              NNUE 权重遵循 Pikafish NNUE-License，允许免费使用，未经许可不得商业使用。
            </p>
            <div className="license-links">
              <a href={`${baseUrl}licenses/GPL-3.0.txt`} {...external}>GPL-3.0 全文</a>
              <a href={`${baseUrl}licenses/NNUE-License.txt`} {...external}>NNUE-License</a>
              <a href={`${baseUrl}licenses/THIRD_PARTY.md`} {...external}>第三方组件</a>
              <a href={`${baseUrl}licenses/SOURCE-OFFER.md`} {...external}>源码与构建信息</a>
              <a href={`${baseUrl}licenses/CONTENT-CC0.md`} {...external}>训练内容 CC0</a>
            </div>
            <p className="fine-print">
              本版本免费公开、非商业：没有广告、付费内容、赞助或其他商业利用。
              如需商业化，必须重新确认 NNUE 许可与 GPL 义务。
            </p>
          </div>
        </section>

        <section className="panel about-section">
          <div className="about-icon"><ShieldCheck size={22} aria-hidden="true" /></div>
          <div>
            <span className="eyebrow">隐私</span>
            <h2>不收集棋谱</h2>
            <p>
              没有账号系统，也没有上传棋谱或训练记录的接口。页面接入百度统计用于访问量统计，可能收集访问设备与页面信息；棋谱、训练进度和设置仍然只保存在当前浏览器。
              清除站点数据会删除它们。
            </p>
          </div>
        </section>
      </div>

      <section className="panel about-source">
        <span className="eyebrow">上游与来源</span>
        <h2>从哪里来</h2>
        <div className="source-links">
          <a href="https://github.com/chuccp/chess-train" {...external}>
            棋练应用源码
            <ExternalLink size={13} aria-hidden="true" />
          </a>
          <a href="https://github.com/official-pikafish/Pikafish" {...external}>
            Pikafish 源码
            <ExternalLink size={13} aria-hidden="true" />
          </a>
          <a href="https://github.com/official-pikafish/Networks" {...external}>
            Pikafish NNUE 网络与许可
            <ExternalLink size={13} aria-hidden="true" />
          </a>
          <a href="https://www.pikafish.com/wiki/reference/uci-options.html" {...external}>
            Pikafish UCI 选项
            <ExternalLink size={13} aria-hidden="true" />
          </a>
          <a href="https://github.com/ningh-o/engine-builds" {...external}>
            Web 构建镜像与校验
            <ExternalLink size={13} aria-hidden="true" />
          </a>
        </div>
        <p className="fine-print">本页不是法律意见；再分发前请核对上游许可证原文。</p>
      </section>

      <section className="about-footer">
        <Heart size={16} aria-hidden="true" />
        <span>棋练 · 给愿意慢慢下棋的人</span>
        <span className="footer-sep">·</span>
        <span>GPL-3.0</span>
      </section>
    </div>
  );
}
