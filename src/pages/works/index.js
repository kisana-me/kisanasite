import Link from "next/link"
import { useEffect } from "react"
import { usePageContext } from "@/contexts/PageContext"
import { getSortedMdsData } from '@/lib/mdsReader'

export function getStaticProps() {
  const sortedMdsData = getSortedMdsData('works')
  return { props: {sortedMdsData} }
}

export default function work({ sortedMdsData }) {
  const { setTitle } = usePageContext()
  useEffect(()=>{
    setTitle('Works')
  }, [])

  return (
    <>
      <div className="wrap">
        <h1>Works</h1>
        {sortedMdsData.map((work) => (
          <Link key={ work.slug } href={ "/works/" + work.slug }>
            <div>{work.title}</div>
            <div>{work.date}</div>
            <div>{work.description}</div>
          </Link>
        ))}
      </div>
      <style jsx>{`
        .wrap {
          padding: 50px 0 0 0;
        }
      `}</style>
    </>
  )
}