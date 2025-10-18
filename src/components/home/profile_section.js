import Link from 'next/link'
import Image from 'next/image'

export default function ProfileSection() {
  return (
    <>
      <div className="profile-wrapper">
        <div className="profile">
          <div className="profile-header">
            <h2>Profile</h2>
            <p>プロフィール</p>
          </div>
          <div className="profile-content">
            <div className="profile-1">
              <h3>きさな / kisana</h3>
              <p>27卒B3。Web系の個人開発ばかりしている。</p>
              <p>バックエンドからフロントエンドまでやりたい。</p>
              <p>不定期でブログやYouTubeなどで投稿をしている。</p>
              <p>よくマイクラサーバーをたててマルチプレイをする。</p>
              <dl>
                <dt>好きなもの:</dt>
                <dd>IT技術 任天堂 SNS ガジェット機器 K-POP BeatBox ...</dd>
                <dt>趣味:</dt>
                <dd>映画ドラマアニメ鑑賞 ゲーム ライブ参戦 サイクリング ...</dd>
                <dt>技術:</dt>
                <dd>Ruby on Rails / Next.js / React / Docker / Ubuntu / Proxmox / Blender / AviUtl ...</dd>
              </dl>
            </div>
            <div className="profile-2">
              <ul>
                <li><Link href="https://ivecolor.com/" legacyBehavior><a rel="noopener noreferrer" target="_blank">IVECOLOR: ブログ</a></Link></li>
                <li><Link href="https://amiverse.net/" legacyBehavior><a rel="noopener noreferrer" target="_blank">Amiverse: SNS</a></Link></li>
              </ul>
              <div className="profile-2-icon">
                <Image src="/images/kisana/kisana-logo.png" alt="kisana icon"
                  style={{ objectFit: 'cover', objectPosition: 'center', borderRadius: '14px',
                    boxShadow: '0px 0px 7px 3px rgba(var(--theme-mode-accent-rgb-value), 50%)'
                  }}fill />
              </div>
              <ul>
                <li><Link href="https://x.com/@kisana_me/" legacyBehavior><a rel="noopener noreferrer" target="_blank">X: @kisana_me</a></Link></li>
                <li><Link href="https://github.com/kisana-me/" legacyBehavior><a rel="noopener noreferrer" target="_blank">GitHub: @kisana-me</a></Link></li>
                <li><Link href="https://youtube.com/@kisana_me/" legacyBehavior><a rel="noopener noreferrer" target="_blank">YouTube: @kisana_me</a></Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .profile-wrapper {
          display: flex;
          justify-content: center;
        }
        .profile {
          width: 100%;
          max-width: 800px;
          padding: 0 20px;
        }
        .profile-header {
          margin-bottom: 10px;
        }
        .profile-header p, .profile-content p {
          color: var(--inconspicuous-color)
        }
        .profile-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: stretch;
          gap: 10px;
        }
        .profile-content p {
          font-size: 0.8em;
        }
        .profile-1, .profile-2 {
          width: 100%;
        }
        .profile-1 {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .profile-1 h3 {
          margin-bottom: 6px;
          font-weight: normal;
        }
        .profile-1 dl {
          margin: 8px 0 0 0;
          color: var(--inconspicuous-color);
          font-size: 0.8em;
        }
        .profile-1 dd {
          margin-left: 20px;
        }
        .profile-2 {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
        }
        .profile-2 ul {
          padding: 0;
          margin: 14px 0;
          list-style: none;
          text-align: center;
        }
        .profile-2 a {
          color: var(--inconspicuous-color);
          font-size: 0.8em;
        }
        .profile-2-icon {
          width: 96px;
        }
        @media screen and (min-width: 600px) {
          .profile {
            width: 80%;
            padding: 0;
          }
          .profile-content {
            flex-direction: row;
          }
          .profile-1, .profile-2 {
            width: auto;
          }
        }
      `}</style>
    </>
  )
}
