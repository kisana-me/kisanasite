import Link from 'next/link'
import { useState, useRef } from 'react'
import ModelViewer from '@/components/home/model_viewer'

export default function ExhibitsSection({ exhibitsData }) {
  const modelViewerRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentExhibit = exhibitsData[currentIndex]
  const handlePrev = () => modelViewerRef.current?.prev()
  const handleNext = () => modelViewerRef.current?.next()
  const handleResetRotation = () => modelViewerRef.current?.resetRotation()
  return (
    <>
      <div className="exhibits">
        <div className="exhibits-1">
          <ModelViewer
            ref={modelViewerRef}
            onTargetChange={setCurrentIndex}
            exhibitsData={exhibitsData}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          <div className="name-plate">
            <span>Studying Design.</span>
            <h1>KISANA:ME</h1>
            <span>
              <Link href="https://twitter.com/kisana_me" rel="noopener noreferrer" target="_blank">
                X: @kisana_me
              </Link>
            </span>
          </div>
        </div>
        <div className="exhibits-2">
          <div className="exhibits-info">
            {currentExhibit && (
              <>
                <h2>{currentExhibit.content.title ? currentExhibit.content.title : 'タイトル不明'}</h2>
                <p>{currentExhibit.content.description ? currentExhibit.content.description : '詳細不明'}</p>
                <Link href={currentExhibit.content.link ? currentExhibit.content.link : '/'} target="_blank" rel="noopener noreferrer">
                  {currentExhibit.content.link ? '詳しく見る' : '詳しく見れない'}
                </Link>
              </>
            )}
          </div>
          <div className="controls-container">
            <button onClick={handlePrev} className="nav-button">
              {'<'}
            </button>
            <button onClick={handleResetRotation} className="nav-button">
              {'↻'}
            </button>
            <button onClick={handleNext} className="nav-button">
              {'>'}
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        {
          /* EXHIBITS */
        }

        .exhibits {
          height: 100svh;
          display: flex;
        }
        .exhibits-1 {
          position: relative;
        }
        .exhibits-2 {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        @media (orientation: landscape) {
          .exhibits {
            flex-direction: row;
          }
          .exhibits-1 {
            width: 70%;
            height: 100%;
          }
          .exhibits-2 {
            width: 30%;
            height: 100%;
            gap: 40px;
          }
        }
        @media (orientation: portrait) {
          .exhibits {
            flex-direction: column;
          }
          .exhibits-1 {
            width: 100%;
            height: 70%;
          }
          .exhibits-2 {
            width: 100%;
            height: 30%;
            gap: 20px;
          }
        }

        {
          /* NAME PLATE */
        }

        .name-plate {
          padding: 10px;
          border-radius: 7px;
          background: rgba(var(--theme-mode-base-rgb-value), 0.5);
          box-sizing: border-box;
          position: absolute;
          bottom: 5%;
          right: 5%;
          backdrop-filter: blur(3px);
        }
        .name-plate span {
          display: inline-block;
          width: 100%;
        }
        .name-plate span:last-child {
          text-align: right;
        }

        {
          /* CONTROLLER */
        }

        .exhibits-info {
          color: var(--text-color);
          text-align: center;
          max-width: 80%;
        }
        .exhibits-info h2 {
          margin: 0 0 10px 0;
          font-size: 24px;
        }
        .exhibits-info p {
          margin: 0 0 15px 0;
          font-size: 16px;
          color: var(--inconspicuous-color);
        }
        .controls-container {
          display: flex;
          gap: 20px;
          z-index: 10;
        }
        .nav-button {
          width: 60px;
          height: 60px;
          background-color: rgba(var(--theme-mode-opp-rgb-value), 0.1);
          border: 1px solid rgba(var(--theme-mode-opp-rgb-value), 0.2);
          border-radius: 50%;
          color: var(--text-color);
          font-size: 24px;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.1s;
          user-select: none;
        }
        .nav-button:hover {
          background-color: rgba(var(--theme-mode-opp-rgb-value), 0.2);
        }
        .nav-button:active {
          transform: scale(0.95);
        }
      `}</style>
    </>
  )
}
