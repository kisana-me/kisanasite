import Header from './header'
import Footer from './footer'

export default function Layout({ children, isDark }) {
  return (
    <div className={`all ${isDark ? "dark" : ""}`}>
      <Header />
      <main>{children}</main>
      <Footer />
      <style jsx>{`
        main {
          min-height: 100svh;
        }
        .dark {
          background-color: #000000e6;
          color: #fff;
        }
      `}</style>
    </div>
  )
}