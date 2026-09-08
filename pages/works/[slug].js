import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import parse from 'html-react-parser'
import { getWork, getWorkSlugs, getWorks } from '@/lib/site'
import { usePageContext } from '@/contexts/page_context'
import MiniCard from '@/components/mini_card'
import TableOfContents from '@/components/table_of_contents'

export async function getStaticPaths() {
  return {
    paths: getWorkSlugs().map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  return { props: { work: getWork(params.slug), works: getWorks() } }
}

export default function Work({ work, works }) {
  const { setTitle, setDescription, setType, setImageUrl } = usePageContext()
  useEffect(() => {
    setTitle(work.title)
    setDescription(work.summary)
    setType('article')
    setImageUrl(work.image)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="work-container">
        <div className="work-main">
          <div className="work-image">
            <Image src={work.image ? work.image : '/images/no-image.png'} alt={work.title} priority fill />
          </div>
          <div className="work-icon">
            <Image src={work.icon ? work.icon : '/images/no-image.png'} alt={work.title} priority fill />
          </div>
          <h1>{work.title}</h1>
          <div>{work.summary}</div>
          <hr />
          <TableOfContents items={work.toc} />
          {parse(work.contentHtml)}
        </div>
        <div className="work-aside">
          {works.map((other) => (
            <Link key={other.slug} href={'/works/' + other.slug} className="work-aside-works">
              <MiniCard title={other.title} image={other.image} summary={other.summary} />
            </Link>
          ))}
        </div>
      </div>
      <style jsx>{`
        .work-container {
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
        }
        .work-main {
          width: 100%;
          max-width: 700px;
          padding: 10px;
          box-sizing: border-box;
        }
        :global(.work-main img) {
          width: 100%;
        }
        .work-image {
          width: 100%;
          display: flex;
        }
        .work-icon {
          width: 50px;
          height: 50px;
          display: flex;
        }
        .work-aside {
          width: 100%;
          padding: 10px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        :global(.work-aside-works) {
          width: 100%;
          max-width: 400px;
          text-decoration: none;
        }
        @media screen and (min-width: 1000px) {
          .work-container {
            flex-direction: row;
          }
          .work-aside {
            max-width: 400px;
          }
        }
      `}</style>
    </>
  )
}
