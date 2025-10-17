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
              {projectsData.map((project) => (
                <Link key={ project.slug } href={ "/works/" + project.slug } style={{cursor: "pointer", textDecoration: "none", color: "inherit"}}>
                  <ProjectsCard project={project} />
                </Link>
              ))}
            </div>
            <div className="projects-2">
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
          margin: 20px;
        }
        .projects-header {
          margin-bottom: 10px;
        }
        .projects-header p {
          color: var(--inconspicuous-color)
        }
        .projects-content {
          overflow-x: scroll;
        }
        .projects-1 {
          display: flex;
          gap: 10px;
        }
        @media screen and (min-width: 600px) {
          .projects {
            width: 80%;
            margin: 0;
          }
        }
      `}</style>
    </>
  )
}
