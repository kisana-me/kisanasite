import Link from "next/link"
import Head from "../components/Head"
import Model from "../components/Model"
import { useEffect, useState } from "react"

export default function Home() {
  return (
    <>
      <Head/>
      <div className="wrap">
        <div className="page">
          <div className="container">
            <div className="model">
            </div>
            <div className="plate">
              <div className="separate">
                <div className="card card-1">
                </div>
              </div>
              <div className="separate">
                <div className="card card-2">
                  <span>Web developer</span>
                  <h1>Koyu0TT</h1>
                  <span><Link href="https://amiverse.net">@amiverse.net</Link></span>
                </div>
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
        .page {
        }
        .container {
          height: calc(100vh - 50px);
        }
        .container:first-child {
          position: relative;
        }
        .container:last-child {
          height: calc(100vh - 122px);
        }
        .model {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        .plate {
          display: flex;
          justify-content: space-around;
          position: absolute;
          width: 100%;
          height: 100%;
        }
        .separate {
          display: flex;
          align-items: center;
        }
        .card-1 {
        }
        .card-2 span {
          display: inline-block;
          width:100%
        }
        .card-2 span:last-child {
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