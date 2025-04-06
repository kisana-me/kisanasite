import { usePageContext } from "@/contexts/page_context"
import { useEffect } from 'react'

export default function Custom500() {
  const { setTitle } = usePageContext()
  useEffect(()=>{
    setTitle('500 サーバーエラー')
  }, [])

  return (
    <>
      <h1>500 - Server-side error occurred</h1>
      <p>サーバー死んでます!</p>
      <style jsx>{`
      `}</style>
    </>
  )
}