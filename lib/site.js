import generatedContent from '@/generated/content.generated'

/**
 * ページが読むのはここだけ。中身は `scripts/generate-content.mjs` が
 * CMS の配信データ（`/export/build.json`）から作る。
 *
 * 契約は blog17 の docs/data-contract.md が正本。
 */

export const site = generatedContent.site

export function getPosts() {
  return generatedContent.posts.list
}

export function getPost(slug) {
  const post = generatedContent.posts.bySlug[slug]
  if (!post) throw new Error(`Post not found: ${slug}`)
  return post
}

export function getPostSlugs() {
  return Object.keys(generatedContent.posts.bySlug)
}

export function getWorks() {
  return generatedContent.works.list
}

export function getWork(slug) {
  const work = generatedContent.works.bySlug[slug]
  if (!work) throw new Error(`Work not found: ${slug}`)
  return work
}

export function getWorkSlugs() {
  return Object.keys(generatedContent.works.bySlug)
}

/**
 * 固定ページ（`status === 'specific'`）。
 * **CMS に無ければ null。** 呼び出し側が「準備中」を出す
 */
export function getPage(slug) {
  return generatedContent.pages[slug] ?? null
}

export function getTags() {
  return generatedContent.tags
}

/** そのタグが付いている記事。並びは記事一覧と同じ（公開日時の新しい順）*/
export function getPostsForTag(slug) {
  return generatedContent.posts.list.filter((post) => post.tags.some((tag) => tag.slug === slug))
}

export function getHomeData() {
  return generatedContent.home
}
