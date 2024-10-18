import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

export default function Header() {
  // Menu
  const [isMenu, setIsMenu] = useState(false)
  useEffect(() => {
    if(isMenu) {
      document.body.style.overflow = 'hidden'
    }else{
      document.body.style.overflow = 'auto'
    }
  }, [isMenu])

  // Theme
  const { theme, setTheme, hue, setHue, resetHue } = useTheme()
  const handleHueChange = (newHue) => {
    setHue(newHue)
  }
  const gradientBackground = `
    linear-gradient(to right, 
    hsl(0, 75%, 70%), 
    hsl(60, 75%, 70%), 
    hsl(120, 75%, 70%), 
    hsl(180, 75%, 70%), 
    hsl(240, 75%, 70%), 
    hsl(300, 75%, 70%), 
    hsl(360, 75%, 70%)
    )
  `

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
            
            <div>
              <div>テーマを変更</div>
              <span>現在のテーマ: {theme}</span>
              <br />
              <button
                onClick={() => setTheme('light')}
              >ライト</button>
              <br />
              <button
                onClick={() => setTheme('system')}
              >システム</button>
              <br />
              <button
                onClick={() => setTheme('dark')}
              >ダーク</button>
            </div>
            <br />
            <br />
            <br />
            <div>
              <div>色を変更</div>
              <span>現在の色: <span style={{ color: 'var(--theme-color)' }}>こんな色</span></span>
              <br />
              <input
                type="range"
                min={0}
                max={360}
                step={1}
                value={hue}
                onChange={(e) => handleHueChange(parseInt(e.target.value))}
                className='input_hue'
                style={{
                  appearance: 'none',
                  height: '12px',
                  borderRadius: '2px',
                  background: gradientBackground,
                  cursor: 'pointer'
                }}
              />
              <br />
              <button
                onClick={resetHue}
                className="reset_hue"
              >リセット</button>
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
        padding: 80px 0;
        overflow-y: auto;
        box-sizing: border-box;
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
      .input_hue::-webkit-slider-thumb {
        appearance: none;
        width: 12px;
        height: 20px;
        background: var(--theme-color);
        border-radius: 2px;
        transition: transform .2s ease;
        border: 0 solid var(--theme-color);
        box-shadow: 0px 4px 5px -2px var(--theme-color);
      }
      .input_hue::-moz-range-thumb {
        appearance: none;
        width: 12px;
        height: 20px;
        background: var(--theme-color);
        border-radius: 2px;
        transition: transform .2s ease;
        border: 0 solid var(--theme-color);
        box-shadow: 0px 4px 5px -2px var(--theme-color);
      }
      .input_hue:hover::-webkit-slider-thumb {
        transform: scale(1.15);
      }
      .input_hue:hover::-moz-range-thumb {
        transform: scale(1.15);
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