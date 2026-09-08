import { getPage } from '@/lib/site'
import StaticPage from '@/components/static_page'

export function getStaticProps() {
  return { props: { page: getPage('privacy-policy') } }
}

export default function Page({ page }) {
  return <StaticPage page={page} title="プライバシーポリシー" subtitle="プライバシーポリシー" />
}
