import Head from "next/head"
import { usePageContext } from "@/contexts/PageContext"
import { useThemeContext } from "@/contexts/ThemeContext"

export default function DefaultHead({ children }) {
  const { title, author, description, keywords, robots, type, imagePath, imageUrl, card, id, url } = usePageContext()
  const { darkMode } = useThemeContext()
  const tmpImagePath = imagePath || "/images/kisana/kisana-1.png"
  const image = imageUrl || new URL(tmpImagePath, process.env.NEXT_PUBLIC_APP_URL || 'http://kisana.me/').toString()
  const alt = "白背景にりんごが5つ並ぶ"
  const site = process.env.NEXT_PUBLIC_APP_URL || 'http://kisana.me/'

  return (
    <Head key={title}>
      <meta charSet="UTF-8" />
      <title>{title ? title + ' | KISANA:ME' : 'KISANA:ME'}</title>
      <meta name="theme-color" content="#ffa9c7" />
      <meta name="color-scheme" content={darkMode ? "dark" : "light"} />
      <meta name="viewport" content="width=device-width" />
      <meta name="author" content={author} />
      <meta name="generator" content="KISANA:ME" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robots} />
      <meta name="creator" content={author} />
      <meta name="googlebot" content={robots} />
      <meta name="publisher" content={author} />
      <meta name="format-detection" content="email=no,telephone=no,address=no" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title ? title + ' | KISANA:ME' : 'KISANA:ME'} />
      <meta property="og:type" content={type} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="ja_JP" />
      <meta property="og:site_name" content={site} />
      <meta name="twitter:card" content={card} />
      <meta name="twitter:site" content={site} />
      <meta name="twitter:site:id" content={id} />
      <meta name="twitter:title" content={title ? title + ' | KISANA:ME' : 'KISANA:ME'} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={alt} />
      <meta name="twitter:creator" content={author} />
      <meta name="twitter:creator:id" content={id} />
      <link rel="icon" href="/favicon.ico" />
      {children}
    </Head>
  )
}