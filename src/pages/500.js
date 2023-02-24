import Head from "../components/Head"

export default function Custom500() {
  return (
    <>
      <Head
      title="500"
      description="Server-side error occurred"
      url=""
      />
      <h1>500 - Server-side error occurred</h1>
      <p>サーバー死んでますね。</p>
    </>
  )
}