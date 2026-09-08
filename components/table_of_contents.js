import Link from 'next/link'

/**
 * 目次。
 *
 * 旧サイトは本文に `[[toc]]` と書くと markdown-it が差し込んでいたが、
 * `@ivecolor/markdown` にその記法は無い。代わりにビルド時に
 * `extractToc()` が見出しを抜いてあるので、ここで組み立てる。
 * 見出しの id は本文側と同じ規則（rehype-slug）なのでそのまま繋がる。
 */
export default function TableOfContents({ items }) {
  if (!items || items.length === 0) return null

  // 一番浅い見出しを基準にして、そこからの深さでぶら下げる
  const top = Math.min(...items.map((item) => item.depth))

  return (
    <>
      <nav className="toc" aria-label="目次">
        <div className="toc-header">目次</div>
        <ul>
          {items.map((item) => (
            <li key={item.id} style={{ paddingLeft: `${(item.depth - top) * 16}px` }}>
              <Link href={`#${item.id}`}>{item.text}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <style jsx>{`
        .toc {
          margin: 20px 0;
          padding: 10px 16px;
          border: 1px solid var(--inconspicuous-color);
          border-radius: 8px;
          font-size: small;
        }
        .toc-header {
          font-weight: bold;
        }
        ul {
          margin: 8px 0 0;
          padding-left: 0;
          list-style-type: none;
        }
        li {
          margin: 2px 0;
        }
      `}</style>
    </>
  )
}
