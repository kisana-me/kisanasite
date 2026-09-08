import { useEffect } from 'react'
import parse from 'html-react-parser'
import { usePageContext } from '@/contexts/page_context'
import TableOfContents from '@/components/table_of_contents'

/**
 * 固定ページ（CMS の `status === 'specific'`）を描く。
 *
 * 見出しと本文は CMS 側で書き換えられる。**CMS にまだ無ければ「準備中」**を出す。
 * 消えたのか作り忘れたのかは画面からは分からないので、ページ自体は残す。
 */
export default function StaticPage({ page, title, subtitle }) {
  const { setTitle, setDescription } = usePageContext()
  useEffect(() => {
    setTitle(page?.title || title)
    setDescription(page?.summary || '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="heading">
        <h1>{page?.title || title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {page ? (
        <div className="static-page">
          <TableOfContents items={page.toc} />
          {parse(page.contentHtml)}
        </div>
      ) : (
        <p>準備中です。</p>
      )}
      <style jsx>{`
        .static-page {
          width: 100%;
          max-width: 700px;
          padding: 10px;
          box-sizing: border-box;
        }
        :global(.static-page img) {
          max-width: 100%;
        }
      `}</style>
    </>
  )
}
