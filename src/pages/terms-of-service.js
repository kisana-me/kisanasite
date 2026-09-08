import { getPage } from '@/lib/site'
import StaticPage from '@/components/static_page'

export function getStaticProps() {
  return { props: { page: getPage('terms-of-service') } }
}

export default function Page({ page }) {
  return <StaticPage page={page} title="利用規約" subtitle="利用規約" />
}
