import { getTags, getAssociatedPosts } from '@/lib/posts'
import React, { useEffect } from 'react'
import { usePageContext } from '@/contexts/page_context'
import Link from 'next/link'

export async function getStaticProps() {
  const allTags = getTags()
  async function getAllAssociatedPosts() {
    const allAssociatedPosts = {}
    for (const tag of allTags) {
      const associatedPosts = await getAssociatedPosts(tag)
      allAssociatedPosts[tag] = associatedPosts
    }
    return allAssociatedPosts
  }
  async function allPostsAndTags() {
    const allAssociatedPosts = await getAllAssociatedPosts()
    const jsonOutput = JSON.stringify(allAssociatedPosts)
    return jsonOutput
  }
  const result = await allPostsAndTags()
  return {
    props: {
      result,
    },
  }
}

export default function Index({ result }) {
  const { setTitle } = usePageContext()
  useEffect(() => {
    setTitle('Tags')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="heading">
        <h1>Tags</h1>
        <p>タグ一覧</p>
      </div>
      {Object.keys(JSON.parse(result)).map((tag) => (
        <div key={tag}>
          <h2 id={tag}>#{tag}</h2>
          <ul>
            {JSON.parse(result)[tag].map((post) => (
              <Link key={post.slug} href={'/posts/' + post.slug}>
                {post.title}
              </Link>
            ))}
          </ul>
        </div>
      ))}
      <style jsx>{``}</style>
    </>
  )
}
