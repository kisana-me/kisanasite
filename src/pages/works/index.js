import Link from "next/link"
import { useEffect } from "react"
import { usePageContext } from "@/contexts/PageContext"
import { getSortedMdsData } from '@/lib/mdsReader'
import Card from "@/components/Card"

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
      <h1>Works</h1>
      <div className="works">
        {sortedMdsData.map((work) => (
          <Link key={ work.slug } href={ "/works/" + work.slug } legacyBehavior>
          <a className="works-card">
            <Card title={work.title} image={work.image} icon={work.icon} summary={work.summary} />
          </a>
          </Link>
        ))}
      </div>
      <style jsx>{`
        .works {
          padding: 10px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .works-card {
          max-width: 100%;
          flex-grow: 1;
        }
      `}</style>
    </>
  )
}