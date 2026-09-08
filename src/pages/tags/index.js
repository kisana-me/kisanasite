import React, { useEffect } from 'react'
import Link from 'next/link'
import { getTags, getPostsForTag } from '@/lib/site'
import { usePageContext } from '@/contexts/page_context'

export function getStaticProps() {
  // 印として使うタグ（works）は `lib/site` の時点で落ちている
  const groups = getTags().map((tag) => ({
    ...tag,
    posts: getPostsForTag(tag.slug).map((post) => ({ slug: post.slug, title: post.title })),
  }))
  return { props: { groups } }
}

export default function Index({ groups }) {
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
      {groups.length === 0 && <p>タグはまだありません。</p>}
      {groups.map((tag) => (
        <div key={tag.slug}>
          <h2 id={tag.slug}>#{tag.name}</h2>
          <ul>
            {tag.posts.map((post) => (
              <li key={post.slug}>
                <Link href={'/posts/' + post.slug}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <style jsx>{``}</style>
    </>
  )
}
