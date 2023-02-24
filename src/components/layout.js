import Header from './header'
import Footer from './footer'
import React, { useState } from 'react'

export default function Layout({ children }) {
  const [isDark, setIsDark] = useState(false)
  const modeTrigger = () => setIsDark(!isDark)
  return (
    <div className={`all ${isDark ? "dark" : ""}`}>
      <Header isDark={isDark} modeTrigger={modeTrigger} />
      <main>{children}</main>
      <Footer />
      <style jsx="true">{`
        .all {
          width: 100%;
          min-height: 100vh;
          position: relative;
        }
        main {
          padding-top: 50px;
          padding-bottom: 72px
        }
        .dark {
          background-color: #000000e6;
          color: #fff;
        }
      `}</style>
    </div>
  )
}