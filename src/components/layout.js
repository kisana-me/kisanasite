import Header from './header'
import Footer from './footer'

export default function Layout({ children, isDark }) {
  return (
    <div className={`all ${isDark ? "dark" : ""}`}>
      <Header />
      <main>{children}</main>
      <Footer />
      <style jsx>{`
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