import { createContext, useContext, useState, useEffect, useRef } from 'react'

const ThemeContext = createContext()

export const ThemeContextProvider = ({ children }) => {
  const thereRenderFlagRef = useRef(false)
  const hueRenderFlagRef = useRef(false)
  const [theme, setTheme] = useState('system')
  const [darkMode, setDarkMode] = useState(false)
  const [hue, setHue] = useState(120)

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    const storedHue = localStorage.getItem('hue')
    if (storedTheme) {
      setTheme(storedTheme)
    }
    if (storedHue) {
      setHue(parseInt(storedHue))
    }
  }, [])

  useEffect(() => {
    if(thereRenderFlagRef.current) {
      localStorage.setItem('theme', theme)
    }else{
      thereRenderFlagRef.current = true
    }
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false
      setDarkMode(systemTheme)
    } else if (theme === 'light') {
      setDarkMode(false)
    } else if (theme === 'dark') {
      setDarkMode(true)
    } else {
      setDarkMode(false)
    }
  }, [theme])

  useEffect(() => {
    if(hueRenderFlagRef.current) {
      localStorage.setItem('hue', hue)
    }else{
      hueRenderFlagRef.current = true
    }
  }, [hue])

  const resetHue = () => {
    setHue(120)
  }

  const GlobalStyles = `
    :root {
      --theme-hue-value: ${hue};
      --theme-hsl-color: hsl(${hue}, 75%, 70%);
      --theme-background-1-hsl-color: hsl(${hue}, 75%, ${darkMode ? '16' : '88'}%);
      --theme-background-2-hsl-color: hsl(${hue}, 75%, ${darkMode ? '10' : '94'}%);
      --theme-background-3-hsl-color: hsl(${hue}, 75%, ${darkMode ? '8' : '96'}%);
      --theme-mode-accent-rgb-value: ${darkMode ? '255,255,255' : '0,0,0'};
      --theme-mode-base-rgb-value: ${darkMode ? '0,0,0' : '255,255,255'};
      --theme-mode-accent-rgb-color: rgb(${darkMode ? '255,255,255' : '0,0,0'});
      --theme-mode-base-rgb-color: rgb(${darkMode ? '0,0,0' : '255,255,255'});
      --inconspicuous-color: hsl(0, 0%, ${darkMode ? '64' : '55'}%);
    }
    html {
      background-color: #${darkMode ? '000' : 'fff'};
      color: #${darkMode ? 'fff' : '000'};
    }
    a {
      color: hsl(${hue}, 75%, 45%);
    }
  `

  return (
    <ThemeContext.Provider value={{ theme, setTheme, hue, setHue, resetHue, darkMode }}>
      <style>{GlobalStyles}</style>
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => useContext(ThemeContext)
