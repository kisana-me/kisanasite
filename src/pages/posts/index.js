import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { getSortedPostsData } from '@/lib/posts'
import { usePageContext } from "@/contexts/PageContext"

export const getStaticProps = () => {
  const allPostsData = getSortedPostsData()
  return { props: { sortedDate: allPostsData[0], sortedUpdate: allPostsData[1] } }
}

export default function Posts({ sortedDate, sortedUpdate }) {
  const { setTitle } = usePageContext()
  useEffect(()=>{
    setTitle('投稿一覧')
  }, [])

  const [isPostOrder, setIsPostOrder] = useState(true)
  const arrayTrigger = () => setIsPostOrder(!isPostOrder)
  return (
    <>
      <div className='wrap'>
        <h1>POST INDEX</h1>
        <button onClick={arrayTrigger}>切り替え</button>
        <p>{isPostOrder ? "投稿順です" : "更新順です" }</p>
        <Link href="/tags">タグ一覧</Link>
        {(isPostOrder ? sortedDate : sortedUpdate).map((post) => (
          <Link key={ post.slug } href={ "/posts/" + post.slug }>
            <div className="post">
              <div className="postImage">
                {post.image ?
                  <Image
                    src={`/images/${post.slug}/${post.image}`}
                    fill
                    sizes="10vw"
                    alt={post.title}
                  />
                :
                <Image
                  src={`/images/no-image.png`}
                  fill
                  sizes="10vw"
                  alt="コンテンツなし"
                />
                }
              </div>
              <div>
                <h2>{ post.title }</h2>
                <div>ID:{ post.slug }</div>
                <div>投稿:{ post.date }</div>
                <div>更新:{ post.update }</div>
                <div>タグ:{ post.tag.map((t)=> <span key={t}>{t}</span> ) }</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <style jsx>{`
        .wrap {
          padding: 50px 0 0 0;
        }
        .post {
          margin: 5px;
          border: solid 2px #329eff;
          display: flex;
          align-items: center;
        }
        h2 {
          margin: 0;
        }
        .postImage {
          position: relative;
          width: 150px;
          min-width: 150px;
        }
      `}</style>
    </>
  )
}
