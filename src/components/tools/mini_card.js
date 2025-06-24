import Image from 'next/image'

export default function Card({image, icon, title, summary}) {
  return (
    <>
      <div className="mini-card">
        <div className="mini-card-image-wrapper">
          <Image src={image ? image : '/images/no-image.png'} alt={title} fill style={{borderRadius: '6px'}} />
        </div>
        <div className="mini-card-plate">
          {icon &&
          <div className="mini-card-icon">
            <Image src={icon} alt={title} fill style={{borderRadius: '4px'}} />
          </div>
          }
          <div className="mini-card-text">
            <div className="mini-card-title">{title}</div>
            <div className="mini-card-summary">{summary ? summary : '---'}</div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .mini-card {
          width: 100%;
          max-width: 400px;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid var(--inconspicuous-color);
          box-sizing: border-box;
          display: flex;
          color: var(--theme-mode-accent-rgb-color);
          text-decoration: none;
        }
        .mini-card-image-wrapper {
          width: 160px;
          aspect-ratio: 16 / 9;
          border-radius: 6px;
          background: var(--inconspicuous-color);
          display: flex;
          flex-shrink: 0;
        }
        .mini-card-image {}
        .mini-card-plate {
          height: 90px;
          margin: 0 0 0 6px;
          overflow: hidden;
          display: flex;
        }
        .mini-card-icon {
          width: 50px;
          height: 50px;
          margin: 0 4px 0 0;
          display: flex;
        }
        .mini-card-text {
          margin: 0 0 0 4px;
          overflow: hidden;
        }
        .mini-card-title {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .mini-card-summary {
          overflow: hidden;
        }
        .mini-card-summary {
          color: var(--inconspicuous-color)
        }
      `}</style>
    </>
  )
}