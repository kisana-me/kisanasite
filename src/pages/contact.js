import { getPage } from '@/lib/site'
import StaticPage from '@/components/static_page'

export function getStaticProps() {
  return { props: { page: getPage('contact') } }
}

export default function Page({ page }) {
  return <StaticPage page={page} title="Contact" subtitle="お問い合わせ" />
}
