import { usePageContext } from '@/contexts/page_context'
import { useEffect } from 'react'

export default function TermsOfService() {
  const { setTitle } = usePageContext()
  useEffect(() => {
    setTitle('Terms of Service')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="heading">
        <h1>Terms of Service</h1>
        <p>利用規約</p>
      </div>
      <h2>免責事項</h2>
      <p>詳細は下記に示しますが、当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。</p>
      <h2>リンク先について</h2>
      <p>
        当サイトは、アフィリエイトプログラムを使って商品を紹介しており、直接の販売は行っておりません。商品に関するお問い合わせは、販売店様のほうに直接ご連絡くださいますようお願い致します。
      </p>
      <p>当サイトからのリンクやバナーなどで移動したサイトで提供される情報、サービス等について一切の責任を負いません。</p>
      <h2>コンテンツについて</h2>
      <p>
        当サイトのコンテンツ・情報について、できる限り正確な情報を提供するように努めておりますが、正確性や安全性を保証するものではありません。情報が古くなっていることもございます。
      </p>
      <p>当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。</p>
      <p>また、本免責事項、および当サイトに掲載しているすべての記事は、予告なしに変更・削除されることがあります。予めご了承下さい。</p>
      <h2>著作権・肖像権について</h2>
      <p>当サイトで掲載している文章・画像・動画等の著作権・肖像権は各権利所有者に帰属します。万が一問題がある場合は、ご連絡お願いします。</p>
      <h2>制定日・最終改定日</h2>
      <ul>
        <li>制定日:2024年2月29日</li>
        <li>最終改定日:未改定</li>
      </ul>
      <style jsx>{``}</style>
    </>
  )
}
