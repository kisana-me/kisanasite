import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Card from '@/components/card'
import { getPosts } from '@/lib/site'
import { usePageContext } from '@/contexts/page_context'

export const getStaticProps = () => {
  return { props: { posts: getPosts() } }
}

/** 更新順は「更新日時が無いものは公開日時で見る」。CMS は未更新なら null を返す */
function byUpdatedDesc(a, b) {
  return (b.editedAt ?? b.publishedAt ?? '').localeCompare(a.editedAt ?? a.publishedAt ?? '')
}

export default function Index({ posts }) {
  const { setTitle } = usePageContext()
  useEffect(() => {
    setTitle('Posts')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [isPostOrder, setIsPostOrder] = useState(true)
  const arrayTrigger = () => setIsPostOrder(!isPostOrder)
  const sorted = isPostOrder ? posts : [...posts].sort(byUpdatedDesc)

  return (
    <>
      <div className="heading">
        <h1>Posts</h1>
        <p>投稿一覧</p>
      </div>
      <button onClick={arrayTrigger}>切り替え</button>
      <p>{isPostOrder ? '投稿順です' : '更新順です'}</p>
      <Link href="/tags">タグ一覧</Link>
      <div className="posts">
        {sorted.map((post, index) => (
          <Link key={post.slug} href={'/posts/' + post.slug} className="posts-card">
            <Card title={post.title} image={post.image} summary={post.summary} priority={index < 3} />
          </Link>
        ))}
      </div>
      <style jsx>{`
        .posts {
          padding: 10px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        :global(.posts-card) {
          width: 100%;
          flex: 1 1 285px;
        }
        @media screen and (min-width: 600px) {
          .posts {
            justify-content: space-evenly;
          }
          :global(.posts-card) {
            flex: 0 0 400px;
          }
        }
      `}</style>
    </>
  )
}
