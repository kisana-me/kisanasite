import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

export default function Header() {
  const [isMenu, setIsMenu] = useState(false)
  const { theme, toggleTheme, color, setColor } = useTheme()
  useEffect(() => {
    if(isMenu) {
      document.body.style.overflow = 'hidden'
    }else{
      document.body.style.overflow = 'auto'
    }
  }, [isMenu])

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
        <div className={isMenu ? 'menu-open' : 'menu-close'}>
          <button onClick={() => setIsMenu(false)}  className="menu-close-button">&times;</button>
          <Link onClick={() => setIsMenu(false)} href="/"><div className="link">Home</div></Link>
          <Link onClick={() => setIsMenu(false)} href="/about"><div className="link">About</div></Link>
          <Link onClick={() => setIsMenu(false)} href="/works"><div className="link">Works</div></Link>
          <Link onClick={() => setIsMenu(false)} href="/posts"><div className="link">Posts</div></Link>
          <div className='view-settings'>
            <button onClick={() => {toggleTheme(); setIsMenu(false)}} className='theme-button'>
              {theme === 'light' ? '🌞 Day' : '🌙 Night'}
            </button>
            <div>
              <button onClick={() => {setColor('red'); setIsMenu(false)}} className={color === 'red' ? 'selected-color-button color-button' : 'color-button'}>🔴</button>
              <button onClick={() => {setColor('green'); setIsMenu(false)}} className={color === 'green' ? 'selected-color-button color-button' : 'color-button'}>💚</button>
              <button onClick={() => {setColor('blue'); setIsMenu(false)}} className={color === 'blue' ? 'selected-color-button color-button' : 'color-button'}>💙</button>
              <button onClick={() => {setColor('pink'); setIsMenu(false)}} className={color === 'pink' ? 'selected-color-button color-button' : 'color-button'}>🩷</button>
              <button onClick={() => {setColor('orange'); setIsMenu(false)}} className={color === 'orange' ? 'selected-color-button color-button' : 'color-button'}>🧡</button>
              <button onClick={() => {setColor('aqua'); setIsMenu(false)}} className={color === 'aqua' ? 'selected-color-button color-button' : 'color-button'}>🩵</button>
              <button onClick={() => {setColor('yellow'); setIsMenu(false)}} className={color === 'yellow' ? 'selected-color-button color-button' : 'color-button'}>💛</button>
              <button onClick={() => {setColor('purple'); setIsMenu(false)}} className={color === 'purple' ? 'selected-color-button color-button' : 'color-button'}>💜</button>
            </div>
          </div>
        </div>
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
      .menu-close {
        display: none;
      }
      .menu-open {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100svh;
        background-color: rgba(0, 0, 0, 0.9);
        color: white;
        text-align: center;
        padding-top: 80px;
      }
      .menu-open-button {
        background: none;
        color: white;
        border: none;
        font-size: 14px;
      }
      .menu-close-button {
        background: none;
        color: white;
        border: none;
        font-size: 14px;
      }
      .view-settings {
        margin-top: 50px;
      }
      .theme-button {
        background: none;
        color: white;
        border: none;
        font-size: 17px;
        box-sizing: border-box;
      }
      .color-button {
        background: none;
        color: white;
        border: none;
        font-size: 17px;
        box-sizing: border-box;
        border: 1px solid #0000;
        border-radius: 7px;
        cursor: pointer;
      }
      .selected-color-button {
        border: 1px solid #fff;
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