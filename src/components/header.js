import Link from 'next/link'
import { useMenu } from '@/contexts/MenuContext'

export default function Header() {
  const { isMenu, setIsMenu } = useMenu()

  return (
    <header>
      <Link href="/"><div className='logo'>KISANA:ME</div></Link>
      <nav>
        <div className="menu-listed">
          <Link href="/"><div className="link">Home</div></Link>
          <Link href="/about"><div className="link">About</div></Link>
          <Link href="/works"><div className="link">Works</div></Link>
          <Link href="/posts"><div className="link">Posts</div></Link>
        </div>
        <button onClick={() => setIsMenu(true)} className="menu-open-button">&#9776;</button>
      </nav>
      <style jsx>{`
        header {
          backdrop-filter: blur(3px);
          background: #00000036;
          display: flex;
          justify-content: space-between;
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
        nav {
          display: flex;
          margin-right: 20px;
        }
        .menu-listed {
          display: none;
          padding: 0;
          justify-content: space-around;
        }
        .menu-open-button {
          background: none;
          color: white;
          border: none;
          font-size: 14px;
          cursor: pointer;
        }
        @media screen and (min-width: 600px) {
          header {
            justify-content: space-around;
          }
          .menu-listed {
            display: flex;
          }
        }
      `}</style>
    </header>
  )
}