import { usePageContext } from '@/contexts/page_context'
import { useEffect } from 'react'
import Link from 'next/link'

export default function Sitemap() {
  const { setTitle } = usePageContext()
  useEffect(() => {
    setTitle('Sitemap')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="heading">
        <h1>Sitemap</h1>
        <p>サイトマップ</p>
      </div>
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
      <style jsx>{``}</style>
    </>
  )
}
