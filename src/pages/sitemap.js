import { usePageContext } from '@/contexts/page_context'
import { useEffect } from 'react'
import Link from 'next/link'
import { getPosts, getWorks } from '@/lib/site'

export function getStaticProps() {
  return {
    props: {
      works: getWorks().map((work) => ({ slug: work.slug, title: work.title })),
      posts: getPosts().map((post) => ({ slug: post.slug, title: post.title })),
    },
  }
}

export default function Sitemap({ works, posts }) {
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
      <p>
        本サイトのすべてのページを示します。検索エンジン向けの XML は
        <Link href="/sitemap.xml">/sitemap.xml</Link>にあります。
      </p>
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
        <li>
          <Link href="/tags">Tags</Link>
        </li>
      </ul>
      <h2>Works</h2>
      <ul>
        {works.map((work) => (
          <li key={work.slug}>
            <Link href={'/works/' + work.slug}>{work.title}</Link>
          </li>
        ))}
      </ul>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={'/posts/' + post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <h2>ツール</h2>
      <ul>
        <li>
          <Link href="/tools/markdown-editor">Markdown Editor</Link>
        </li>
        <li>
          <Link href="/tools/blockchain-maker">Blockchain Maker</Link>
        </li>
        <li>
          <Link href="/tools/rsa-key-generator">RSA Key Generator</Link>
        </li>
      </ul>
      <h2>このサイトについて</h2>
      <ul>
        <li>
          <Link href="/terms-of-service">利用規約</Link>
        </li>
        <li>
          <Link href="/privacy-policy">プライバシーポリシー</Link>
        </li>
        <li>
          <Link href="/contact">お問い合わせ</Link>
        </li>
        <li>
          <Link href="/feed.xml">RSS</Link>
        </li>
      </ul>
      <style jsx>{``}</style>
    </>
  )
}
