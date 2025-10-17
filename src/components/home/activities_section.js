import Link from 'next/link'
import Image from 'next/image'

export default function ActivitiesSection() {
  return (
    <>
      <div className="activities-wrapper">
        <div className="activities">
          <div className="activities-header">
            <h2>Activities</h2>
            <p>活動</p>
          </div>
          <div className="activities-content">
            <div className="activities-1">
              活動中。。。
            </div>
            <div className="activities-2">
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .activities-wrapper {
          display: flex;
          justify-content: center;
        }
        .activities {
          width: 100%;
          max-width: 800px;
          margin: 20px;
        }
        .activities-header {
          margin-bottom: 10px;
        }
        .activities-header p {
          color: var(--inconspicuous-color)
        }
        @media screen and (min-width: 600px) {
          .activities {
            width: 80%;
            margin: 0;
          }
        }
      `}</style>
    </>
  )
}
