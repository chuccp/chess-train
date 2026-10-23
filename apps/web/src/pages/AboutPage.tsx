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
          <h1>一个安静的象棋练习场</h1>
          <p>
            棋练把对弈、杀法、残局和开局放在一张棋桌上。人机走子优先使用在线 AI，
            连接异常时由本地 AI 接替，
            但没有账号、匹配或排行榜；棋局与训练进度留在本机。
          </p>
        </div>
      </section>

      <div className="about-grid">
        <section className="panel about-section">
          <div className="about-icon"><Cpu size={22} aria-hidden="true" /></div>
          <div>
            <span className="eyebrow">服务</span>
            <h2>在线 AI，本地备用</h2>
            <p>
              象棋优先调用在线 AI，页面不下载大型引擎文件。
              网络不可用时改用浏览器内置的小型 AI；训练分支始终使用本地 AI。
            </p>
            <dl className="info-list">
              <div><dt>棋类</dt><dd>象棋、五子棋、四子棋、斗兽棋、跳棋等</dd></div>
              <div><dt>协议</dt><dd>UCCI / UCI 风格着法</dd></div>
              <div><dt>运行</dt><dd>在线 AI · 本地 AI 备用</dd></div>
            </dl>
          </div>
        </section>

        <section className="panel about-section">
          <div className="about-icon"><WifiOff size={22} aria-hidden="true" /></div>
          <div>
            <span className="eyebrow">离线</span>
            <h2>双人与训练，断网也能用</h2>
            <p>
              应用壳、训练内容和本地 AI 资源缓存在浏览器中，断网后仍可双人对弈、
              做训练并使用本地分支应手。常规人机对弈仍优先使用在线 AI；浏览器清理站点缓存后会重新加载页面资源。
            </p>
          </div>
        </section>

        <section className="panel about-section" id="licenses">
          <div className="about-icon"><BookOpen size={22} aria-hidden="true" /></div>
          <div>
            <span className="eyebrow">许可</span>
            <h2>开源与第三方声明</h2>
            <p>
              常规人机走子由在线 AI 计算；训练分支和离线降级使用本地 AI。
              棋练代码以 <strong>GPL-3.0</strong> 发布；Pikafish 代码同为 GPL-3.0，
              NNUE 权重遵循 Pikafish NNUE-License；ElephantEye 使用 LGPL-2.1。
            </p>
            <div className="license-links">
              <a href={`${baseUrl}licenses/GPL-3.0.txt`} {...external}>GPL-3.0 全文</a>
              <a href={`${baseUrl}licenses/LGPL-2.1.txt`} {...external}>LGPL-2.1 全文</a>
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
              没有账号系统，也没有上传棋谱或训练记录的接口。AI 走子请求只携带当前局面（不含对局历史）。
              页面接入百度统计用于访问量统计，可能收集访问设备与页面信息；棋谱、训练进度和设置仍然只保存在当前浏览器。
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
          <a href="https://github.com/xqbase/eleeye" {...external}>
            ElephantEye 源码
            <ExternalLink size={13} aria-hidden="true" />
          </a>
          <a href="https://github.com/billzi2016/Chinese-Chess-AI" {...external}>
            ElephantEye WASM 构建参考
            <ExternalLink size={13} aria-hidden="true" />
          </a>
          <a href="https://www.pikafish.com/wiki/reference/uci-options.html" {...external}>
            Pikafish UCI 选项
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
