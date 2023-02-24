import Link from "next/link"
import Head from "../components/Head"

export default function Home() {
  return (
    <>
      <Head/>
      <div className="container">
        <div className="separate">
          <div className="card">
            <h1>.</h1>
          </div>
        </div>
        <div className="separate">
          <div className="card">
            <span>Amiverse.net</span>
            <h1>First Page.</h1>
            <span><Link href="post">投稿一覧</Link></span>
          </div>
        </div>
      </div>
      <hr />
      <div className="container">
        {/*content here*/}
      </div> 
      <style jsx="true">{`
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