import Head from "@/components/Head"
import Link from "next/link"

export default function sitemap() {
  return (
    <>
      <Head
      title="サイトマップ"
      description="サイトマップ"
      url="/sitemap/"
      />
      <div className="wrap">
        <h1>サイトマップ</h1>
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
            <Link href="/tools/markdown-editor">マークダウンエディタ</Link>
          </li>
        </ul>
      </div>
      <style jsx>{`
        .wrap {
          padding: 50px 0 0 0;
        }
      `}</style>
    </>
  )
}