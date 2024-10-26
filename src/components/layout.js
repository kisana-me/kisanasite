import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <style jsx>{`
        main {
          min-height: 100svh;
        }
      `}</style>
    </>
  )
}