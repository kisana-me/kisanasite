import '../styles/globals.css'
import Layout from '../components/layout'
import '../styles/atom-one-dark-reasonable.min.css'
import Script from "next/script"
import * as gtag from "../lib/gtag"
import { useRouter } from "next/router"
import React, { useState, useEffect, createContext } from 'react'

export const darkContext = createContext()
export const setDarkContext = createContext()

export default function App({ Component, pageProps }) {
  const [isDark, setIsDark] = useState(false)
  const modeTrigger = () => setIsDark(!isDark)
  useEffect(() => {
    if(window.matchMedia('(prefers-color-scheme: dark)').matches === true){
      modeTrigger()
    } 
  },[])
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
    <setDarkContext.Provider value={modeTrigger}>
      <darkContext.Provider value={isDark}>
        <Layout isDark={isDark}>
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
      </darkContext.Provider>
    </setDarkContext.Provider>
  )
}