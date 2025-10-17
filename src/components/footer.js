import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className='top-content'>
        <div className='list-wrapper'>
          <div className='list-name'>ソーシャルメディア</div>
          <ul>
            <li><Link href='https://amiverse.net/@kisana/' rel='noopener noreferrer' target='_blank' legacyBehavior><a className='list-content'>Amiverse</a></Link></li>
            <li><Link href='https://misskey.io/@kisana/' rel='noopener noreferrer' target='_blank' legacyBehavior><a className='list-content'>Misskey.io</a></Link></li>
            <li><Link href='https://x.com/@kisana_me/' rel='noopener noreferrer' target='_blank' legacyBehavior><a className='list-content'>X</a></Link></li>
          </ul>
        </div>
        <div className='list-wrapper'>
          <div className='list-name'>関連サイト</div>
          <ul>
            <li><Link href='https://amiverse.net/' legacyBehavior><a className='list-content' rel='noopener noreferrer' target='_blank'>Amiverse➚</a></Link></li>
            <li><Link href='https://ivecolor.com/' legacyBehavior><a className='list-content' rel='noopener noreferrer' target='_blank'>IVECOLOR⇗</a></Link></li>
            <li><Link href='https://bealive.amiverse.net/' legacyBehavior><a className='list-content' rel='noopener noreferrer' target='_blank'>BeAlive.➚</a></Link></li>
            <li><Link href='https://x.amiverse.net/' legacyBehavior><a className='list-content' rel='noopener noreferrer' target='_blank'>得句巣⇗</a></Link></li>
          </ul>
        </div>
        <div className='list-wrapper'>
          <div className='list-name'>ツール</div>
          <ul>
            <li><Link href='/tools/markdown-editor' legacyBehavior><a className='list-content'>Markdown Editor</a></Link></li>
            <li><Link href='/tools/blockchain-maker' legacyBehavior><a className='list-content'>Blockchain Maker</a></Link></li>
          </ul>
          <div className='list'>
          </div>
        </div>
        <div className='list-wrapper'>
          <div className='list-name'>このサイトについて</div>
          <ul>
            <li><Link href='/sitemap' legacyBehavior><a className='list-content'>サイトマップ</a></Link></li>
            <li><Link href='/terms' legacyBehavior><a className='list-content'>利用規約</a></Link></li>
            <li><Link href='/policy' legacyBehavior><a className='list-content'>プライバシーポリシー</a></Link></li>
            <li><Link href='/contact' legacyBehavior><a className='list-content'>お問い合わせ</a></Link></li>
          </ul>
        </div>
      </div>
      <div className='bottom-content'>
        <div className='copyright'>
          © kisana
        </div>
        <div className='made-by'>
          Made by kisana
        </div>
      </div>
      <style jsx>{`
        footer {
          margin: 50px 0 0;
          padding: 20px;
          border-top: 1px solid var(--inconspicuous-color);
          border-radius: 20px 20px 0 0;
          font-size: small;
        }

        /* top-content */

        .top-content {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          flex-wrap: wrap;
        }
        .list-wrapper {
          margin: 20px;
        }
        .list-name {
          font-weight: bold;
        }
        ul {
          margin: 0;
          padding-left: 0;
          list-style-type: none;
        }
        .list-content {
          display: inline;
          color: var(--inconspicuous-color);
          text-decoration: none;
        }
        .list-content:hover {
          text-decoration: underline;
        }

        /* bottom-content */

        .bottom-content {
          padding: 10px;
          border-top: 1px solid var(--inconspicuous-color);
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .copyright {

        }
        .made-by {
          color: var(--inconspicuous-color);
        }
        @media (min-width: 700px) {
          .top-content {
            flex-direction: row;
          }
        }
      `}</style>
    </footer>
  )
}