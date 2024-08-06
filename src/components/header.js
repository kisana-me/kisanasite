import Link from 'next/link'

export default function Header() {
  return (
    <header>
      <Link href="/"><div className='logo'>KISANA:ME</div></Link>
      <nav>
        <Link href="/"><div className="link">Home</div></Link>
        <Link href="/about"><div className="link">About</div></Link>
        <Link href="/works"><div className="link">Works</div></Link>
        <Link href="/posts"><div className="link">Posts</div></Link>
      </nav>
      <style jsx>{`
      header {
        backdrop-filter: blur(12px);
        display: flex;
        justify-content: space-around;
        top: 0;
        position: fixed;
        width: 100%;
        height: 44px;
        padding: 3px;
        z-index: 100;
      }
      .logo {
        padding: 10px;
        color: #ffffff;
      }
      .link {
        padding: 10px;
        color: #ffffff;
      }
      nav{
        display: flex;
        padding: 0;
        margin: 0 20px 0 auto;
        width: 250px;
        justify-content: space-around;
      }
      `}</style>
    </header>
  )
}