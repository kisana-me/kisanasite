import { getPage } from '@/lib/site'
import StaticPage from '@/components/static_page'

export function getStaticProps() {
  return { props: { page: getPage('about') } }
}

export default function Page({ page }) {
  return <StaticPage page={page} title="About" subtitle="私について" />
}
