import Link from "next/link"
import Image from 'next/image'
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
      <h1>Works</h1>
      <div className="works">
        {sortedMdsData.map((work) => (
          <Link key={ work.slug } href={ "/works/" + work.slug } legacyBehavior>
          <a className="works-card">
            <div className="work-image-wrapper">
              <Image src={work.image} alt={work.title} fill style={{borderRadius: '6px'}} />
            </div>
            <div className="work-plate">
              <div className="work-icon">
                <Image src={work.icon} alt={work.title} fill />
              </div>
              <div className="work-text">
                <div className="work-title">{work.title}</div>
                <div className="work-summary">{work.summary}</div>
              </div>
            </div>
          </a>
          </Link>
        ))}
      </div>
      <style jsx>{`
        .works {
          max-width: 500px;
        }
        .works-card {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          box-sizing: border-box;
          background: #363636;
          display: inline-block;
          color: var(--theme-mode-accent-rgb-color);
          text-decoration: none;
        }
        .work-image-wrapper {
          display: flex;
        }
        .work-image {}
        .work-plate {
          display: flex;
        }
        .work-icon {
          width: 50px;
          display: flex;
        }
        .work-text {}
        .wotk-title {}
        .work-summary {}
      `}</style>
    </>
  )
}