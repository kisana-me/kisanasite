import Head from "../components/Head"

export default function Custom500() {
  return (
    <>
      <Head
      title="500"
      description="Server-side error occurred"
      url=""
      />
      <div className="wrap">
        <h1>500 - Server-side error occurred</h1>
        <p>サーバー死んでます!</p>
      </div>
      <style jsx>{`
        .wrap {
          padding: 50px 0 0 0;
        }
      `}</style>
    </>
  )
}