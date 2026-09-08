import Link from 'next/link'
import ProjectsCard from './projects_card'

export default function ProjectsSection({ projectsData }) {
  return (
    <>
      <div className="projects">
        <div className="heading">
          <h2>Projects</h2>
          <p>企画</p>
        </div>
        <div className="projects-content">
          {projectsData.map((category) => (
            <div key={category.id} className="projects-category">
              <h3>{category.title}</h3>
              <p>{category.summary}</p>
              <div className="projects-cards">
                {category.projects.map((project) => (
                  <Link
                    key={project.id}
                    href={project.link}
                    style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <ProjectsCard project={project} />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
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
          scrollbar-width: none;
        }
      `}</style>
    </>
  )
}
