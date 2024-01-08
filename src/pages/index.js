import Link from "next/link"
import Head from "../components/Head"
import { useEffect, useState } from "react"

export default function Home() {
  return (
    <>
      <Head/>
      <div className="wrap">
        <div className="parallax">
          <div className="parallax-obj pobj-1"></div>
          <div className="parallax-obj pobj-2"></div>
          <div className="parallax-obj pobj-3"></div>
        </div>
        <div className="page">
          <div className="container">
            <div className="separate">
              <div className="card">
              </div>
            </div>
            <div className="separate">
              <div className="card">
                <span>--------</span>
                <h1>Koyu0TT</h1>
                <span><Link href="https://amiverse.net">@amiverse.net</Link></span>
              </div>
            </div>
          </div>
          <hr />
          <div className="container">
            <h2>page2</h2>
          </div> 
          <hr />
          <div className="container">
            <h2>last page</h2>
          </div>
        </div>
      </div>
      <style jsx>{`
        .wrap {
          position: relative;
        }
        .parallax {
          height: 100%;
          width: 100%;
          position: absolute;
          top: 0px;
          left: 0px;
        }
        @keyframes parallax-small-anim {
          from {
            transform: translateY(-1500px);
          }
          to {
            transform: translateY(0px);
          }
        }
        .parallax-obj {
          border-radius: 8px;
          box-shadow: 0 0px 16px rgb(0, 0, 0, .16);
          position: absolute;
          aspect-ratio: 1 / 1;
          animation: parallax-small-anim linear;
          animation-timeline: scroll();
        }
        .pobj-1 {
          background-image: repeating-conic-gradient(from 45deg,#ffffff,#62929E,#ffffff 180deg);
          background-size: 25px 25px;
          width: 50px;
          top: 2500px;
          left: calc(50% - 175px);
        }
        .pobj-2 {
          background-image: repeating-conic-gradient(from 45deg,#ffffff,#B9314F,#ffffff 180deg);
          background-size: 25px 25px;
          width: 150px;
          top: 2600px;
          left: calc(50% - -160px);
        }
        .pobj-3 {
          background-image: repeating-conic-gradient(from 45deg,#ffffff33,#DDB967,#ffffff66 180deg);
          background-size: 25px 25px;
          width: 80px;
          top: 2200px;
          left: calc(50% - 320px);
        }
        .page {
          top: 0px;
          left: 0px;
        }
        .container {
          height: calc(100vh - 50px);
          justify-content: space-around;
        }
        .container:first-child {
          display: flex;
        }
        .container:last-child {
          height: calc(100vh - 122px);
        }
        .separate {
          display: flex;
          align-items: center;
        }
        .card span {
          display: inline-block;
          width:100%
        }
        .card span:last-child {
          text-align:right
        }
        .post {
          border: solid 2px #329eff;
        }
        hr {
          height: 0.5px;
          border: none;
          margin: 2.25px 35px;
          background: linear-gradient(to right, blue, red);
        }
      `}</style>
    </>
  )
}