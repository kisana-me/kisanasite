import { usePageContext } from '@/contexts/page_context'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Contact() {
  const { setTitle } = usePageContext()
  useEffect(() => {
    setTitle('Contact')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="heading">
        <h1>Contact</h1>
        <p>お問い合わせ</p>
      </div>
      <p>
        私が運営しているブログサイトの
        <Link href="https://ivecolor.com/contact/">お問い合わせフォーム</Link>をご使用ください。
      </p>
      <style jsx>{``}</style>
    </>
  )
}
