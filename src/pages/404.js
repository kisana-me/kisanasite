import { usePageContext } from "@/contexts/PageContext"
import { useEffect } from 'react'

export default function Custom404() {
  const { setTitle } = usePageContext()
  useEffect(()=>{
    setTitle('404 存在しないページ')
  }, [])

  return (
    <>
      <div className="wrap">
        <h1>404 - Page Not Found</h1>
        <p>お探しのページはありません!</p>
      </div>
      <style jsx>{`
        .wrap {
          padding: 50px 0 0 0;
        }
      `}</style>
    </>
  )
}