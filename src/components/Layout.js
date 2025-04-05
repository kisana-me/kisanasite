import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { usePageContext } from '@/contexts/PageContext'

export default function Layout({ children }) {
  const { mainTagTopPadding } = usePageContext()

  return (
    <>
      <Header />
      <main className={mainTagTopPadding ? 'main-tag-top-padding' : ''}>{children}</main>
      <Footer />
      <style jsx>{`
        main {
          min-height: calc(100svh - 150px);
        }
        .main-tag-top-padding {
          padding: 50px 0 0 0;
        }
      `}</style>
    </>
  )
}