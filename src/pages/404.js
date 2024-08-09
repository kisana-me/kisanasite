import Head from "../components/Head"

export default function Custom404() {
  return (
    <>
      <Head
      title="404"
      description="Page Not Found"
      url=""
      />
      <div className="wrap">
        <h1>404 - Page Not Found</h1>
        <p>お探しのページはありません!</p>
      </div>
      <style jsx>{`
        .wrap {
          padding: 50px 0 0 0;
        }
      `}</style>
    </>
  )
}