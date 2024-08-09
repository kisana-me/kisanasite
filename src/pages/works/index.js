import Head from "@/components/Head"

export default function work() {
  return (
    <>
      <div className="wrap">
        <Head
        title="Works"
        description="Works"
        url="/works/"
        />
        <h1>Works</h1>
      </div>
      <style jsx>{`
        .wrap {
          padding: 50px 0 0 0;
        }
      `}</style>
    </>
  )
}