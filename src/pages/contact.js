import { usePageContext } from "@/contexts/page_context"
import { useEffect } from 'react'

export default function contact() {
  const { setTitle } = usePageContext()
  useEffect(()=>{
    setTitle('Contact')
  }, [])

  return (
    <>
      <h1>お問い合わせ</h1>
      <p>
        私が運営しているブログサイトの<a href="https://ivecolor.com/contact/">お問い合わせフォーム</a>をご使用ください。
      </p>
      <style jsx>{`
      `}</style>
    </>
  )
}