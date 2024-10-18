import { createContext, useContext, useState, useEffect, useRef } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const thereRenderFlagRef = useRef(false)
  const hueRenderFlagRef = useRef(false)
  const [theme, setTheme] = useState('system')
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
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
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
    --theme-hue: ${hue};
    --theme-color: hsl(${hue}, 75%, 70%);
  }
  a {
    color: hsl(${hue}, 75%, 45%);
  }
  `

  return (
    <ThemeContext.Provider value={{ theme, setTheme, hue, setHue, resetHue }}>
      <style>{GlobalStyles}</style>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
