import Link from 'next/link'
import { useMenu } from '@/contexts/menu_context'

export default function Header() {
  const { setIsMenu } = useMenu()

  return (
    <header>
      <Link href="/" className="logo">
        KISANA:ME
      </Link>
      <nav>
        <div className="menu-wrapper">
          <Link href="/" className="link">
            Home
          </Link>
          <Link href="/about" className="link">
            About
          </Link>
          <Link href="/works" className="link">
            Works
          </Link>
          <Link href="/posts" className="link">
            Posts
          </Link>
        </div>
        <button onClick={() => setIsMenu(true)} className="menu-open-button">
          &#9776;
        </button>
      </nav>
      <style jsx>{`
        header {
          width: 100%;
          height: 44px;
          padding: 3px;
          top: 0;
          position: fixed;
          background: linear-gradient(
            0deg,
            rgba(var(--theme-mode-base-rgb-value), 0.3) 0%,
            rgba(var(--theme-mode-base-rgb-value), 0.5) 40%,
            rgba(var(--theme-mode-base-rgb-value), 0.8) 100%
          );
          backdrop-filter: blur(3px);
          display: flex;
          justify-content: space-between;
          z-index: 100;
        }
        :global(.logo) {
          padding: 10px;
          color: var(--theme-mode-accent-rgb-color);
          text-decoration: none;
        }
        :global(.link) {
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
