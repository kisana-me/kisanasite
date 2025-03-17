import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className='foreword'>
        <div className='list-wrap'>
          <div className='list-name'>ソーシャルメディア</div>
          <ul>
            <li><Link href='https://amiverse.net/@kisana/' rel='noopener noreferrer' target='_blank'><div className='list-content'>Amiverse</div></Link></li>
            <li><Link href='https://misskey.io/@kisana/' rel='noopener noreferrer' target='_blank'><div className='list-content'>Misskey.io</div></Link></li>
            <li><Link href='https://x.com/@kisana_me/' rel='noopener noreferrer' target='_blank'><div className='list-content'>X</div></Link></li>
          </ul>
        </div>
        <div className='list-wrap'>
          <div className='list-name'>関連サイト</div>
          <ul>
            <li><Link href='https://amiverse.net/' rel='noopener noreferrer' target='_blank'><div className='list-content'>Amiverse</div></Link></li>
              <li><Link href='https://ivecolor.com/' rel='noopener noreferrer' target='_blank'><div className='list-content'>IVECOLOR</div></Link></li>
              <li><Link href='https://bealive.amiverse.net/' rel='noopener noreferrer' target='_blank'><div className='list-content'>BeAlive.</div></Link></li>
            </ul>
        </div>
        <div className='list-wrap'>
          <div className='list-name'>ツール</div>
          <ul>
            <li><Link href='/tools/markdown-editor'><div className='list-content'>Markdown Editor</div></Link></li>
            <li><Link href='/tools/blockchain-maker'><div className='list-content'>Blockchain Maker</div></Link></li>
          </ul>
          <div className='list'>
          </div>
        </div>
        <div className='list-wrap'>
          <div className='list-name'>このサイトについて</div>
          <ul>
            <li><Link href='/sitemap'><div className='list-content'>サイトマップ</div></Link></li>
            <li><Link href='/terms'><div className='list-content'>利用規約</div></Link></li>
            <li><Link href='/policy'><div className='list-content'>プライバシーポリシー</div></Link></li>
            <li><Link href='/contact'><div className='list-content'>お問い合わせ</div></Link></li>
          </ul>
        </div>
      </div>
      <div className='content'>
        <div className='copyright'>
          ©kisana
        </div>
        <div className='madeby'>
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
        /* forward */
        .foreword {
          width: 100%;
          display: flex;
          justify-content: space-evenly;
          flex-wrap: wrap;
        }
        .list-wrap {
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
        }
        /* content */
        .content {
          padding: 10px 10px 0;
          border-top: 1px solid var(--inconspicuous-color);
          text-align: right;
        }
        .copyright {

        }
        .madeby {
          color: var(--inconspicuous-color);
        }
        @media (max-width: 700px) {
          .foreword {
            flex-direction: column;
          }
        }
      `}</style>
    </footer>
  )
}