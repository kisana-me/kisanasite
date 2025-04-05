import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { usePageContext } from '@/contexts/PageContext'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Layout({ children }) {
  const { mainTagTopPadding, setMainTagTopPadding } = usePageContext()
  const router = useRouter()
  const pathsWithoutMainTagTopPadding = ['/']

  useEffect(() => {
    const isPathWithoutMainTagTopPadding = pathsWithoutMainTagTopPadding.includes(router.pathname)
    setMainTagTopPadding(!isPathWithoutMainTagTopPadding)
  }, [router.pathname])

  return (
    <>
      <Header />
      <main className={mainTagTopPadding ? 'main-tag-top-padding' : 'a'}>{children}</main>
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