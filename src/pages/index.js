import Link from "next/link"
import Head from "../components/Head"

export default function Home() {
  return (
    <>
      <Head/>
      <div className="wrap">
        <div className="container c-1">
          <div className="name-plate">
            <span>Studying Design.</span>
            <h1>KISANA:ME</h1>
            <span><Link href="https://twitter.com/kisana_me">@kisana_me</Link></span>
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
      <style jsx>{`
        .wrap {
          position: relative;
        }
        .container {
          height: calc(100vh - 50px);
        }
        .container:first-child {
          position: relative;
        }
        .c-1 {
          display: flex;
          position: relative;
        }
        .name-plate {
          align-self: flex-start;
          position: absolute;
          bottom: 50px;
          right: 50px;
        }
        .name-plate span {
          display: inline-block;
          width:100%
        }
        .name-plate span:last-child {
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