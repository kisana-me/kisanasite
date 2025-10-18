import Link from 'next/link'
import Image from 'next/image'
import ProjectsCard from './projects_card'

export default function ProjectsSection({ projectsData }) {
  return (
    <>
      <div className="projects-wrapper">
        <div className="projects">
          <div className="projects-header">
            <h2>Projects</h2>
            <p>企画</p>
          </div>
          <div className="projects-content">
            <div className="projects-1">
              <h3>Web applications</h3>
              <p>ウェブアプリケーション</p>
              <div className="projects-cards">
                {projectsData.map((project) => (
                  <Link key={ project.slug } href={ "/works/" + project.slug } style={{cursor: "pointer", textDecoration: "none", color: "inherit"}}>
                    <ProjectsCard project={project} />
                  </Link>
                ))}
              </div>
            </div>
            <div className="projects-2">
              <h3>YouTube videos</h3>
              <p>ユーチューブ動画</p>
              <div className="projects-cards">
              </div>
            </div>
            <div className="projects-3">
              <h3>Articles</h3>
              <p>記事</p>
              <div className="projects-cards">
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .projects-wrapper {
          display: flex;
          justify-content: center;
        }
        .projects {
          width: 100%;
          max-width: 800px;
          padding: 0 20px;
          box-sizing: border-box;
        }
        .projects-header {
          margin-bottom: 10px;
        }
        .projects-header p {
          color: var(--inconspicuous-color)
        }
        .projects-content h3 {
          font-weight: normal;
        }
        .projects-content p {
          color: var(--inconspicuous-color);
          font-size: 0.8em;
        }
        .projects-cards {
          margin: 10px 0;
          display: flex;
          gap: 10px;
          overflow-x: scroll;
        }
        @media screen and (min-width: 600px) {
          .projects {
            width: 80%;
            padding: 0;
          }
        }
      `}</style>
    </>
  )
}
