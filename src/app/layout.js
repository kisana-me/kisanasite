import '@/styles/globals.css'
import '@/styles/atom-one-dark-reasonable.min.css'
import { Providers } from './providers'
import Head from "@/components/head"
import Layout from '@/components/layout'
import Script from 'next/script'
import * as gtag from '@/lib/gtag'

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <Providers>
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
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  )
}
