import { usePageContext } from '@/contexts/page_context'
import { useEffect } from 'react'

export default function Custom404() {
  const { setTitle } = usePageContext()
  useEffect(() => {
    setTitle('404 - Page Not Found')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="heading">
        <h1>404 - Page Not Found</h1>
        <p>ページが見つかりません</p>
      </div>
      <p>お探しのページが見つかりませんでした。移動または削除された可能性があります。</p>
      <style jsx>{``}</style>
    </>
  )
}
