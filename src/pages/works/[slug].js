import { useEffect } from "react"
import Image from 'next/image'
import Link from 'next/link'
import parse from 'html-react-parser'
import { getAllMdIds, getMdData, getSortedMdsData } from '@/lib/mds_reader'
import { usePageContext } from "@/contexts/page_context"
import MiniCard from '@/components/mini_card'

export async function getStaticPaths() {
  const paths = getAllMdIds('works')
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const sortedMdsData = getSortedMdsData('works')
  const mdData = await getMdData('works', params.slug)
  return { props: { mdData, sortedMdsData } }
}

export default function work({ mdData, sortedMdsData }) {
  const { setTitle, setDescription, setType, setImageUrl } = usePageContext()
  useEffect(()=>{
    setTitle(mdData.title)
    setDescription(mdData.description)
    setType('article')
    setImageUrl(mdData.image)
  }, [])

  return (
    <>
      <div className="work-container">
        <div className="work-main">
          <div className="work-image">
            <Image src={mdData.image ? mdData.image : '/images/no-image.png'} alt={mdData.title} priority fill />
          </div>
          <div className="work-icon">
            <Image src={mdData.icon ? mdData.icon : '/images/no-image.png'} alt={mdData.title} priority fill />
          </div>
          <h1>{mdData.title}</h1>
          <div>{mdData.description}</div>
          <hr />
          {parse(mdData.contentHtml)}
        </div>
        <div className="work-aside">
          {sortedMdsData.map((work) => (
            <Link key={ work.slug } href={ "/works/" + work.slug } legacyBehavior>
              <a className="">
                <MiniCard title={work.title} image={work.image} summary={work.summary} />
              </a>
            </Link>
          ))}
        </div>
      </div>
      <style jsx>{`
        .work-container {
          display: flex;
          flex-direction: column;
        }
        .work-main {
          width: 100%;
          max-width: 700px;
          padding: 10px;
          box-sizing: border-box;
        }
        .work-image {
          width: 100%;
          display: flex;
        }
        .work-icon {
          width: 50px;
          height:  50px;
          display: flex;
        }
        .work-aside {
          width: 100%;
          margin: 10px;
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