import Link from 'next/link'
import { useMenu } from '@/contexts/menu_context'

export default function Header() {
  const { setIsMenu } = useMenu()

  return (
    <header>
      <Link href="/" legacyBehavior><a className='logo'>KISANA:ME</a></Link>
      <nav>
        <div className="menu-wrapper">
          <Link href="/" legacyBehavior><a className="link">Home</a></Link>
          <Link href="/about" legacyBehavior><a className="link">About</a></Link>
          <Link href="/works" legacyBehavior><a className="link">Works</a></Link>
          <Link href="/posts" legacyBehavior><a className="link">Posts</a></Link>
        </div>
        <button onClick={() => setIsMenu(true)} className="menu-open-button">&#9776;</button>
      </nav>
      <style jsx>{`
        header {
          width: 100%;
          height: 44px;
          padding: 3px;
          top: 0;
          position: fixed;
          background: linear-gradient(0deg,
            rgba(var(--theme-mode-base-rgb-value),0.30) 0%,
            rgba(var(--theme-mode-base-rgb-value),0.5) 40%,
            rgba(var(--theme-mode-base-rgb-value),0.8) 100%
          );
          backdrop-filter: blur(3px);
          display: flex;
          justify-content: space-between;
          z-index: 100;
        }
        .logo {
          padding: 10px;
          color: var(--theme-mode-accent-rgb-color);
          text-decoration: none;
        }
        .link {
          padding: 10px;
          color: var(--theme-mode-accent-rgb-color);
          text-decoration: none;
        }
        nav {
          display: flex;
          margin-right: 20px;
        }
        .menu-wrapper {
          display: none;
          padding: 0;
          justify-content: space-around;
        }
        .menu-open-button {
          border: none;
          background: none;
          color: var(--theme-mode-accent-rgb-color);
          text-decoration: none;
          font-size: 14px;
          cursor: pointer;
        }
        @media screen and (min-width: 600px) {
          header {
            justify-content: space-around;
          }
          .menu-wrapper {
            display: flex;
          }
        }
      `}</style>
    </header>
  )
}