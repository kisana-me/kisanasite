"use client"

import { ThemeContextProvider } from '@/contexts/theme_context'
import { ScrollbarContextProvider } from '@/contexts/scrollbar_context'
import { MenuContextProvider } from '@/contexts/menu_context'
import { PageContextProvider } from '@/contexts/page_context'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import * as gtag from '@/lib/gtag'

export function Providers({ children }) {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname) gtag.pageview(pathname)
  }, [pathname])

  return (
    <ThemeContextProvider>
      <ScrollbarContextProvider>
        <MenuContextProvider>
          <PageContextProvider>
            {children}
          </PageContextProvider>
        </MenuContextProvider>
      </ScrollbarContextProvider>
    </ThemeContextProvider>
  )
}
