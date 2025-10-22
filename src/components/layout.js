import Header from '@/components/header'
import Footer from '@/components/footer'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { usePageContext } from '@/contexts/page_context'

export default function Layout({ children }) {
  const { fullMain, setFullMain } = usePageContext()
  const router = useRouter()
  const pathsUseFullMain = ['/']

  useEffect(() => {
    const isPathUseFullMain = pathsUseFullMain.includes(router.pathname)
    setFullMain(isPathUseFullMain)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname])

  return (
    <>
      <Header />
      <main className={fullMain ? 'full-main' : ''}>{children}</main>
      <Footer />
      <style jsx>{`
        main {
          width: 100%;
          min-height: calc(100svh - 150px);
          padding: 50px 20px 0;
          max-width: 1500px;
          box-sizing: border-box;
        }
        .full-main {
          padding: 0;
          max-width: 100%;
        }
        @media screen and (min-width: 800px) {
          main {
            width: 90%;
            padding: 50px 0 0;
            margin: 0 auto;
          }
        }
      `}</style>
    </>
  )
}
