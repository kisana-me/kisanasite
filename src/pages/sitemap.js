import { usePageContext } from "@/contexts/page_context"
import { useEffect } from 'react'
import Link from "next/link"

export default function sitemap() {
  const { setTitle } = usePageContext()
  useEffect(()=>{
    setTitle('サイトマップ')
  }, [])

  return (
    <>
      <h1>サイトマップ</h1>
      <p>本サイトのすべてのページを示します。</p>
      <h2>メイン</h2>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/works">Works</Link>
        </li>
        <li>
          <Link href="/posts">Posts</Link>
        </li>
      </ul>
      <h2>ツール</h2>
      <ul>
        <li>
          <Link href="/tools/markdown-editor">Markdown Editor</Link>
        </li>
        <li>
          <Link href="/tools/blockchain-maker">Blockchain Maker</Link>
        </li>
      </ul>
      <style jsx>{`
      `}</style>
    </>
  )
}