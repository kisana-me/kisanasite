import DataDisplay from "@/components/data_display"
import Head from "../components/Head"
import fs from 'fs'
import path from 'path'

export default function about({data}) {
  return (
    <>
      <Head
      title="About"
      description="About"
      url="/about/"
      />
      <div className="wrap">
        <h1>About</h1>
        <p>こんにちは、私は「きさな🍭/kisana」です。</p>
        <p>自称WEBプログラマです。</p>
        <div>
          <DataDisplay data={data} dataType='service' />
          <DataDisplay data={data} dataType='tech' />
          <DataDisplay data={data} dataType='hobby' />
        </div>
      </div>
      <style jsx>{`
        .wrap {
          padding: 50px 0 0 0;
        }
      `}</style>
    </>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'series.json')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const data = JSON.parse(fileContents)

  return {
    props: {
      data
    }
  };
}