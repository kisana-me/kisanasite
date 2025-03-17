import { usePageContext } from "@/contexts/PageContext"
import { useEffect } from 'react'

export default function Custom500() {
  const { setTitle } = usePageContext()
  useEffect(()=>{
    setTitle('500 サーバーエラー')
  }, [])

  return (
    <>
      <div className="wrap">
        <h1>500 - Server-side error occurred</h1>
        <p>サーバー死んでます!</p>
      </div>
      <style jsx>{`
        .wrap {
          padding: 50px 0 0 0;
        }
      `}</style>
    </>
  )
}