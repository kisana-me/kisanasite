import Image from 'next/image'

export default function Card({image, icon, title, summary}) {
  return (
    <>
      <div className="card">
        <div className="card-image-wrapper">
          <Image src={image ? image : '/images/no-image.png'} alt={title} fill style={{borderRadius: '6px'}} />
        </div>
        <div className="card-plate">
          {icon &&
          <div className="card-icon">
            <Image src={icon} alt={title} fill style={{borderRadius: '4px'}} />
          </div>
          }
          <div className="card-text">
            <div className="card-title">{title}</div>
            <div className="card-summary">{summary ? summary : '---'}</div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .card {
          width: 100%;
          max-width: 400px;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid var(--inconspicuous-color);
          box-sizing: border-box;
          display: inline-block;
          color: var(--theme-mode-accent-rgb-color);
          text-decoration: none;
        }
        .card-image-wrapper {
          display: flex;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 6px;
          background: var(--inconspicuous-color);
        }
        .card-image {}
        .card-plate {
          margin: 6px 0 0;
          display: flex;
        }
        .card-icon {
          width: 50px;
          height: 50px;
          margin: 0 4px 0 0;
          display: flex;
        }
        .card-text {
          margin: 0 0 0 4px;
          overflow: hidden;
        }
        .card-title, .card-summary {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .card-summary {
          color: var(--inconspicuous-color)
        }
      `}</style>
    </>
  )
}