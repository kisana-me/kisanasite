import Link from 'next/link'
import { useEffect } from 'react'
import { usePageContext } from '@/contexts/page_context'
import { getSortedMdsData } from '@/lib/mds_reader'
import Card from '@/components/card'

export function getStaticProps() {
  const sortedMdsData = getSortedMdsData('works')
  return { props: { sortedMdsData } }
}

export default function Index({ sortedMdsData }) {
  const { setTitle } = usePageContext()
  useEffect(() => {
    setTitle('Works')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <h1>Works</h1>
      <div className="works">
        {sortedMdsData.map((work, index) => (
          <Link key={work.slug} href={'/works/' + work.slug} className="works-card">
            <Card title={work.title} image={work.image} icon={work.icon} summary={work.summary} priority={index < 3} />
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
        :global(.works-card) {
          width: 100%;
        }
        @media screen and (min-width: 600px) {
          .works {
            justify-content: space-evenly;
          }
          :global(.works-card) {
            flex: 0 0 400px;
          }
        }
      `}</style>
    </>
  )
}
