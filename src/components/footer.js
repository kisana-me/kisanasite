import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div>
        <div className="copyright">© Amiverse</div>
        <div className="kisana">
          Made by <Link href="https://github.com/Kisana528/personal-website">Kisana</Link>
        </div>
        <div><Link href="/edit">新規作成</Link></div>
      </div>
      <div>
        <ul>
          <Link href="/policy"><li>POLICY</li></Link>
          <Link href="/disclaimer"><li>DISCLAIMER</li></Link>
          <Link href="/contact"><li>CONTACT</li></Link>
        </ul>
      </div>
      <style jsx>{`
      footer {
        background-color: #9ad1ff;
        width: 100%;
        position: absolute;
        bottom: 0;
        display: flex;
        justify-content: space-around;
      }
      .copyright {
      }
      ul {
        margin: 0;
        padding: 0;
      }
      li {
        list-style: none;
        color: #2987d8;
      }
      `}</style>
    </footer>
  )
}