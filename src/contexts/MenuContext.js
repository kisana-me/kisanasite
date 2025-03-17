import Link from 'next/link'
import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { useThemeContext } from '@/contexts/ThemeContext'

const MenuContext = createContext()

export const MenuContextProvider = ({ children }) => {
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
  const { theme, setTheme, hue, setHue, resetHue } = useThemeContext()
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
    <MenuContext.Provider value={{isMenu, setIsMenu}}>
      {children}
      <div className={isMenu ? 'menu-open' : 'menu-close'}>
        <button onClick={() => setIsMenu(false)}  className="menu-close-button">&times;</button>
        <Link onClick={() => setIsMenu(false)} href="/"><div className="link">Home</div></Link>
        <Link onClick={() => setIsMenu(false)} href="/about"><div className="link">About</div></Link>
        <Link onClick={() => setIsMenu(false)} href="/works"><div className="link">Works</div></Link>
        <Link onClick={() => setIsMenu(false)} href="/posts"><div className="link">Posts</div></Link>
        <div className='view-settings'>
          <div>
            <div>テーマを変更</div>
            <br />
            <button
              onClick={() => {
                const themes = ['light', 'dark', 'system'];
                const currentIndex = themes.indexOf(theme);
                const nextIndex = (currentIndex + 1) % themes.length;
                setTheme(themes[nextIndex]);
              }}
            >
              {theme === 'light' ? '☀️' : theme === 'dark' ? '🌙' : '🖥️'}
            </button>
          </div>
          <br />
          <br />
          <br />
          <div>
            <div>色を変更</div>
            <span>現在の色: <span style={{ color: 'var(--theme-hsl-color)' }}>こんな色</span></span>
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
      <style jsx>{`
        .link {
          padding: 10px;
          color: rgb(var(--theme-mode-accent-rgb-value));
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
          color: rgb(var(--theme-mode-accent-rgb-value));
          background-color: rgba(var(--theme-mode-base-rgb-value), 0.9);
          text-align: center;
          padding: 80px 0;
          overflow-y: auto;
          box-sizing: border-box;
          z-index: 102;
        }
        .menu-close-button {
          background: none;
          color: rgb(var(--theme-mode-accent-rgb-value));
          border: none;
          font-size: 14px;
          cursor: pointer;
        }
        .view-settings {
          margin-top: 50px;
        }
        .input_hue::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 20px;
          background: var(--theme-hsl-color);
          border-radius: 2px;
          transition: transform .2s ease;
          border: 0 solid var(--theme-hsl-color);
          box-shadow: 0px 4px 5px -2px var(--theme-hsl-color);
        }
        .input_hue::-moz-range-thumb {
          appearance: none;
          width: 12px;
          height: 20px;
          background: var(--theme-hsl-color);
          border-radius: 2px;
          transition: transform .2s ease;
          border: 0 solid var(--theme-hsl-color);
          box-shadow: 0px 4px 5px -2px var(--theme-hsl-color);
        }
        .input_hue:hover::-webkit-slider-thumb {
          transform: scale(1.15);
        }
        .input_hue:hover::-moz-range-thumb {
          transform: scale(1.15);
        }
        .input_hue:active::-webkit-slider-thumb {
          transform: scale(1.15);
        }
        .input_hue:active::-moz-range-thumb {
          transform: scale(1.15);
        }
      `}</style>
    </MenuContext.Provider>
  )
}

export const useMenu = () => useContext(MenuContext)
