import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="top-content">
        <div className="list-wrapper">
          <div className="list-name">ソーシャルメディア</div>
          <ul>
            <li>
              <Link href="https://amiverse.net/@kisana/" rel="noopener noreferrer" target="_blank" className="list-content">
                Amiverse
              </Link>
            </li>
            <li>
              <Link href="https://misskey.io/@kisana/" rel="noopener noreferrer" target="_blank" className="list-content">
                Misskey.io
              </Link>
            </li>
            <li>
              <Link href="https://x.com/@kisana_me/" rel="noopener noreferrer" target="_blank" className="list-content">
                X
              </Link>
            </li>
          </ul>
        </div>
        <div className="list-wrapper">
          <div className="list-name">関連サイト</div>
          <ul>
            <li>
              <Link href="https://amiverse.net/" className="list-content" rel="noopener noreferrer" target="_blank">
                Amiverse➚
              </Link>
            </li>
            <li>
              <Link href="https://ivecolor.com/" className="list-content" rel="noopener noreferrer" target="_blank">
                IVECOLOR⇗
              </Link>
            </li>
            <li>
              <Link href="https://bealive.amiverse.net/" className="list-content" rel="noopener noreferrer" target="_blank">
                BeAlive.➚
              </Link>
            </li>
            <li>
              <Link href="https://x.amiverse.net/" className="list-content" rel="noopener noreferrer" target="_blank">
                得句巣⇗
              </Link>
            </li>
          </ul>
        </div>
        <div className="list-wrapper">
          <div className="list-name">ツール</div>
          <ul>
            <li>
              <Link href="/tools/markdown-editor" className="list-content">
                Markdown Editor
              </Link>
            </li>
            <li>
              <Link href="/tools/blockchain-maker" className="list-content">
                Blockchain Maker
              </Link>
            </li>
          </ul>
          <div className="list"></div>
        </div>
        <div className="list-wrapper">
          <div className="list-name">このサイトについて</div>
          <ul>
            <li>
              <Link href="/sitemap" className="list-content">
                サイトマップ
              </Link>
            </li>
            <li>
              <Link href="/terms" className="list-content">
                利用規約
              </Link>
            </li>
            <li>
              <Link href="/policy" className="list-content">
                プライバシーポリシー
              </Link>
            </li>
            <li>
              <Link href="/contact" className="list-content">
                お問い合わせ
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="bottom-content">
        <div className="copyright">© kisana</div>
        <div className="made-by">Made by kisana</div>
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
        :global(.list-content) {
          display: inline;
          color: var(--inconspicuous-color);
          text-decoration: none;
        }
        :global(.list-content:hover) {
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
