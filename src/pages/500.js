import { usePageContext } from '@/contexts/page_context'
import { useEffect } from 'react'

export default function Custom500() {
  const { setTitle } = usePageContext()
  useEffect(() => {
    setTitle('500 - Server-side error occurred')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="heading">
        <h1>500 - Server-side error occurred</h1>
        <p>サーバーエラーが発生しました</p>
      </div>
      <p>サーバーエラーが発生しました。お手数ですが管理者にご連絡ください。</p>
      <style jsx>{``}</style>
    </>
  )
}
