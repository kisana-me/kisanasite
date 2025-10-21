import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Card from '@/components/card'
import { getSortedPostsData } from '@/lib/posts'
import { usePageContext } from '@/contexts/page_context'

export const getStaticProps = () => {
  const allPostsData = getSortedPostsData()
  return { props: { sortedDate: allPostsData[0], sortedUpdate: allPostsData[1] } }
}

export default function Index({ sortedDate, sortedUpdate }) {
  const { setTitle } = usePageContext()
  useEffect(() => {
    setTitle('投稿一覧')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [isPostOrder, setIsPostOrder] = useState(true)
  const arrayTrigger = () => setIsPostOrder(!isPostOrder)
  return (
    <>
      <h1>Posts</h1>
      <button onClick={arrayTrigger}>切り替え</button>
      <p>{isPostOrder ? '投稿順です' : '更新順です'}</p>
      <Link href="/tags">タグ一覧</Link>
      <div className="posts">
        {(isPostOrder ? sortedDate : sortedUpdate).map((post, index) => (
          <Link key={post.slug} href={'/posts/' + post.slug} className="posts-card">
            <Card
              title={post.title}
              image={post.image}
              summary={post.description}
              priority={index < 3}
            />
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
