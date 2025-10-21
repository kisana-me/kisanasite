import { usePageContext } from '@/contexts/page_context'
import { useEffect } from 'react'

export default function Custom404() {
  const { setTitle } = usePageContext()
  useEffect(() => {
    setTitle('404 存在しないページ')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <h1>404 - Page Not Found</h1>
      <p>お探しのページはありません!</p>
      <style jsx>{``}</style>
    </>
  )
}
