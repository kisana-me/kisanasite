import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className='list-wrap'>
        <div className="copyright">©KISANA:ME</div>
        <div className="kisana">
          Made by KISANA:ME
        </div>
        <div><Link href="/edit">新規作成</Link></div>
      </div>
      <div className='list-wrap'>
        <div className='list-name'>関連サイト</div>
        <div className='list'>
          <Link href="https://amiverse.net/"><div className='list-content'>amiverse</div></Link>
          <Link href="https://ivecolor.com/"><div className='list-content'>ivecolor</div></Link>
        </div>
      </div>
      <div className='list-wrap'>
        <div className='list-name'>法的表示</div>
        <div className='list'>
          <Link href="/terms"><div className='list-content'>利用規約</div></Link>
          <Link href="/policy"><div className='list-content'>プライバシーポリシー</div></Link>
          <Link href="/contact"><div className='list-content'>お問い合わせ</div></Link>
        </div>
      </div>
      <style jsx>{`
      footer {
        width: 100%;
        padding: 100px 0;
        border-top: 1px solid var(--border-color);
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
      }
      .copyright {
      }
      .list-wrap {
        margin: 20px;
      }
      .list-name {
        font-weight: bold;
      }

      .list-content {
        color: var(--inconspicuous-color);
      }
      ul {
        margin: 0;
        padding: 0;
      }
      li {
        list-style: none;
        color: #2987d8;
      }
      @media (max-width: 600px) {
        footer {
          flex-wrap: nowrap;
          flex-direction: column;
        }
      }
      `}</style>
    </footer>
  )
}