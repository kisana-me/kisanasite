import Link from "next/link"
import { useEffect } from "react"
import { usePageContext } from "@/contexts/page_context"
import { getSortedMdsData } from '@/lib/mds_reader'
import Card from "../../components/card"

export function getStaticProps() {
  const sortedMdsData = getSortedMdsData('works')
  return { props: {sortedMdsData} }
}

export default function index({ sortedMdsData }) {
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
          width: 100%;
          max-width: 400px;
          flex-grow: 1;
        }
      `}</style>
    </>
  )
}