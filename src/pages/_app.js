import '@/styles/globals.css'
import '@/styles/atom-one-dark-reasonable.min.css'
import Layout from '@/components/Layout'
import * as gtag from "@/lib/gtag"
import { ThemeContextProvider } from '@/contexts/theme_context'
import { ScrollbarContextProvider } from '@/contexts/scrollbar_context'
import { MenuContextProvider } from '@/contexts/menu_context'
import { PageContextProvider } from '@/contexts/page_context'
import Script from "next/script"
import { useRouter } from "next/router"
import React, { useEffect } from 'react'
import Head from "@/components/Head"

export default function App({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    const handleRouterChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on("routeChangeComplete", handleRouterChange)
    return () => {
      router.events.off("routeChangeComplete", handleRouterChange)
    }
  }, [router.events])
  return (
    <ThemeContextProvider>
    <ScrollbarContextProvider>
    <MenuContextProvider>
    <PageContextProvider>
      <Head />
      <Layout>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA4_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA4_ID}');
            `,
          }}
        />
        <Component {...pageProps} />
      </Layout>
    </PageContextProvider>
    </MenuContextProvider>
    </ScrollbarContextProvider>
    </ThemeContextProvider>
  )
}