import Image from 'next/image'
import { getAllMdIds, getMdData, getSortedMdsData } from '@/lib/mdsReader'
import Link from 'next/link'
import parse from 'html-react-parser'
import { useEffect } from "react"
import { usePageContext } from "@/contexts/PageContext"

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

export default function Post({ mdData, sortedMdsData }) {
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
        <div className="work-others">
        </div>
      </div>
      <style jsx>{`
        .work-container {
          display: flex;
          flex-direction: column;
        }
        .work-main {
          width: 100%;
          max-width: 600px;
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
        .work-others {
          width: 100%;
          margin: 10px;
        }
        /* ??? */
        .post {
          display: flex;
          margin: 7px;
        }
        .pathPostImage {
          width: 150px;
        }
        .pathPostTxt {
          width: 50%;
        }
        .pathTxt {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        @media screen and (min-width: 800px) {
        .work-container {
          flex-direction: row;
        }
        .work-others {
          width: 40%;
          max-width: 400px;
        }
        }
      `}</style>
    </>
  )
}