import Link from 'next/link'
import Image from 'next/image'

export default function ProjectsCard({ project }) {
  return (
    <>
      <div className='projects-card'>
        <div className='projects-card-image'>
          <div className='projects-card-image-container'>
            <Image src={project.image} alt="object" style={{ objectFit: 'cover', objectPosition: 'center' }} fill />
          </div>
        </div>
        <div className='projects-card-info'>
          <div className='projects-card-title'>{project.title}</div>
          <div className='projects-card-summary'>{project.summary}</div>
        </div>
      </div>
      <style jsx>{`
        .projects-card {
          width: 200px;
          border-radius: 8px;
          overflow: hidden;
        }
        .projects-card-image {
          width: 200px;
          overflow: hidden;
        }
        .projects-card-image-container {
          position: relative;
          transition: transform 0.5s ease;
          z-index: -1;
        }
        .projects-card:hover .projects-card-image-container {
          transform: scale(1.1);
        }
        .projects-card-info {
          width: 100%;
          background: linear-gradient(135deg, #22d3ee45, #8b5cf694);
          padding: 4px;
          box-sizing: border-box;
        }
        .projects-card-title {
          font-size: 0.9em;
        }
        .projects-card-summary {
          font-size: 0.8em;
          color: var(--inconspicuous-color);
        }
      `}</style>
    </>
  )
}
