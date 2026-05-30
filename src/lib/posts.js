import generatedContent from '@/generated/content.generated'

export function getTags() {
  const allPosts = getSortedPostsData()[0]
  let tags = [];
  allPosts.forEach((post) => {
    tags = [...tags, ...post.tag]
  })
  const setTags = [...new Set(tags)];
  return setTags.sort();
}

export async function getAssociatedPosts(tag) {
  const allPosts = getSortedPostsData()[0]
  const associatedPosts = allPosts.filter((data) => data.tag.includes(tag))
  return associatedPosts
}

export function getSortedPostsData() {
  return [generatedContent.posts.sortedDate, generatedContent.posts.sortedUpdate]
}

export function getAllPostIds() {
  return generatedContent.posts.slugs.map((slug) => ({
    params: { slug },
  }))
}

export async function getPostData(id) {
  const post = generatedContent.posts.bySlug[id]
  if (!post) {
    throw new Error(`Post not found: ${id}`)
  }
  return post
}