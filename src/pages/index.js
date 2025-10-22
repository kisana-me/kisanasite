import { usePageContext } from '@/contexts/page_context'
import { useEffect } from 'react'
import fs from 'fs'
import path from 'path'
import ExhibitsSection from '@/components/home/exhibits_section'
import ProfileSection from '@/components/home/profile_section'
import ProjectsSection from '@/components/home/projects_section'
import ActivitiesSection from '@/components/home/activities_section'

export default function Index({ exhibitsData, projectsData }) {
  const { setTitle, fullMain } = usePageContext()

  useEffect(() => {
    setTitle('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="home-hero">
        <ExhibitsSection key={String(fullMain)} exhibitsData={exhibitsData} fullMain={fullMain} />
      </div>
      <div className="home-sections">
        <ProfileSection />
        <ProjectsSection projectsData={projectsData} />
        <ActivitiesSection />
      </div>
      <style jsx>{`
        :global(.home-hero h1),
        :global(.home-hero h2),
        :global(.home-hero h3),
        :global(.home-hero p),
        :global(.home-sections h1),
        :global(.home-sections h2),
        :global(.home-sections h3),
        :global(.home-sections p) {
          margin: 0;
        }
        .home-sections {
          width: 100%;
          max-width: 1500px;
          padding: 0 20px 0;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        .color-layer {
          position: 'relative';
          width: 100%;
          height: 100%;
          background-color: var(--background-color);
          background-image:
            // prettier-ignore
            radial-gradient(at 46% 50%, hsla(213, 100%, 68%, 1) 0px, transparent 50%),
            radial-gradient(at 75% 42%, hsla(51, 100%, 50%, 1) 0px, transparent 50%),
            radial-gradient(at 69% 70%, hsla(108, 100%, 66%, 1) 0px, transparent 50%),
            radial-gradient(at 52% 82%, hsla(181, 100%, 66%, 1) 0px, transparent 50%),
            radial-gradient(at 44% 19%, hsla(234, 100%, 65%, 1) 0px, transparent 50%),
            radial-gradient(at 25% 27%, hsla(305, 100%, 56%, 1) 0px, transparent 50%),
            radial-gradient(at 20% 51%, hsla(0, 76%, 46%, 1) 0px, transparent 50%);
        }
        .heading-wrap {
          display: flex;
          justify-content: center;
          margin: 50px 0 20px;
        }
        .heading-wrap h2 {
          text-align: center;
          background: linear-gradient(90deg, #747eee, #d453cc 50%, #fe5597);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          border-bottom: 2px solid var(--link-color);
        }
        @media screen and (min-width: 800px) {
          .home-sections {
            width: 90%;
            padding: 0;
            margin: 0 auto;
          }
        }
      `}</style>
    </>
  )
}

export async function getStaticProps() {
  function getJsonData(fileName) {
    const filePath = path.join(process.cwd(), 'data', 'home', fileName)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContents)
  }

  const exhibitsData = getJsonData('exhibits.json')
  const projectsData = getJsonData('projects_data.json')

  return {
    props: {
      exhibitsData,
      projectsData,
    },
  }
}
