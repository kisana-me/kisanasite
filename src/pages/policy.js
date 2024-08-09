import Head from "../components/Head"
import Link from "next/link"

export default function policy() {
  return (
    <>
      <Head
      title="POLICY"
      description="POLICY"
      url="/policy/"
      />
      <div className="wrap">
        <h1>このサイトの運営方針</h1>
        <h2>個人情報の利用目的</h2>
        <p>当サイトでは、お問い合わせの際やコメント機能にて、 名前やメールアドレス等の個人情報を入力いただく場合がございます。</p>
        <p>取得した個人情報は、お問い合わせに対する回答や必要な情報を電子メールなどをでご連絡する場合に 利用させていただくものであり、これらの目的以外では利用いたしません。</p>
        <h2>アクセス解析ツールについて</h2>
        <p>当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。</p>
        <p>このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。 このトラフィックデータは匿名で収集されており、個人を特定するものではありません。 この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。</p>
        <p>この規約に関して、詳しくは<Link href="https://policies.google.com/technologies/partner-sites">こちら</Link>をクリックしてください。</p>
        <h2>著作権について</h2>
        <p>当サイトの記事について、著作権は放棄しておりません。当サイトで掲載している文章や画像などにつきましては、無断転載することを禁止します。引用の範囲を超えるものについては、法的処置を行います。転載を希望される方は、「お問い合わせ」よりご連絡をお願いします。</p>
        <p>また、当サイトは著作権や肖像権の侵害を目的としたものではありません。著作権や肖像権に関して問題がございましたら、お問い合わせフォームよりご連絡ください。迅速に対応いたします。</p>
        <h2>リンクについて</h2>
        <p>当ブログは基本的にリンクフリーです。リンクを行う場合の許可や連絡は不要です。</p>
        <p>ただし、インラインフレームの使用や画像の直リンクはご遠慮ください。</p>
        <h2>制定日・最終改定日</h2>
        <ul>
          <li>制定日:2024年2月29日</li>
          <li>最終改定日:未改定</li>
        </ul>
      </div>
      <style jsx>{`
        .wrap {
          padding: 50px 0 0 0;
        }
      `}</style>
    </>
  )
}