"use client"
import Header from '@/components/header'
import Footer from '@/components/footer'
import { usePageContext } from '@/contexts/page_context'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function Layout({ children }) {
  const { mainTagTopPadding, setMainTagTopPadding } = usePageContext()
  const pathname = usePathname()
  const pathsWithoutMainTagTopPadding = ['/']

  useEffect(() => {
    if (!pathname) return
    if (typeof setMainTagTopPadding !== 'function') return
    const isPathWithoutMainTagTopPadding = pathsWithoutMainTagTopPadding.includes(pathname)
    setMainTagTopPadding(!isPathWithoutMainTagTopPadding)
  }, [pathname, setMainTagTopPadding])

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