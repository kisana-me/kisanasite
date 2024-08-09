import { createContext, useContext, useState, useEffect, useRef } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const thereRenderFlagRef = useRef(false)
  const colorRenderFlagRef = useRef(false)
  const [theme, setTheme] = useState('dark')
  const [color, setColor] = useState('green')

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    const storedColor = localStorage.getItem('color')
    if (storedTheme) {
      setTheme(storedTheme)
    }
    if (storedColor) {
      setColor(storedColor)
    }
  }, [])

  useEffect(() => {
    if(thereRenderFlagRef.current) {
      localStorage.setItem('theme', theme)
      document.documentElement.className = 'html-' + theme + ' ' + 'html-' + color
      document.body.className = theme + ' ' + color
    }else{
      thereRenderFlagRef.current = true
    }
  }, [theme])

  useEffect(() => {
    if(colorRenderFlagRef.current) {
      localStorage.setItem('color', color)
      document.documentElement.className = 'html-' + theme + ' ' + 'html-' + color
      document.body.className = theme + ' ' + color
    }else{
      colorRenderFlagRef.current = true
    }
  }, [color])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, color, setColor }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
