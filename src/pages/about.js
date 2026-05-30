import { useEffect } from 'react'
import generatedContent from '@/generated/content.generated'
import { usePageContext } from '@/contexts/page_context'
import UnorderedList from '@/components/about/unordered_list'

export default function About({ data }) {
  const { setTitle } = usePageContext()
  useEffect(() => {
    setTitle('About')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="heading">
        <h1>About</h1>
        <p>私について</p>
      </div>
      <p>こんにちは、私は「きさな🍭/kisana」です。</p>
      <p>自称WEBプログラマです。</p>

      <div className="heading mt-20">
        <h2>Services</h2>
        <p>サービス</p>
      </div>
      <p>サービスの内容は以下の通りです。</p>
      <UnorderedList data={data.service} />

      <div className="heading mt-20">
        <h2>Technologies</h2>
        <p>技術</p>
      </div>
      <p>技術の内容は以下の通りです。</p>
      <UnorderedList data={data.tech} />

      <div className="heading mt-20">
        <h2>Hobbies</h2>
        <p>趣味</p>
      </div>
      <p>趣味の内容は以下の通りです。</p>
      <UnorderedList data={data.hobby} />
      <style jsx>{``}</style>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      data: generatedContent.series,
    },
  }
}
