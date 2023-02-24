import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import { getSortedPostsData } from '../../lib/posts'
import Head from "../../components/Head"

export const getStaticProps = () => {
  const allPostsData = getSortedPostsData()
  return { props: { sortedDate: allPostsData[0], sortedUpdate: allPostsData[1] } }
}

export default function Home({ sortedDate, sortedUpdate }) {
  const [isPostOrder, setIsPostOrder] = useState(true)
  const arrayTrigger = () => setIsPostOrder(!isPostOrder)
  return (
    <>
      <Head
      title="投稿一覧"
      description="投稿一覧"
      url="/post/"
      />
      <h1>POST INDEX</h1>
      <button onClick={arrayTrigger}>切り替え</button>
      <p>{isPostOrder ? "投稿順です" : "更新順です" }</p>
      {(isPostOrder ? sortedDate : sortedUpdate).map((post) => (
        <Link key={ post.slug } href={ "/post/" + post.slug }>
          <div className="post">
            <div className="postImage">
              {post.image ?
                <Image
                  src={`/images/${post.slug}/${post.image}`}
                  layout="fill"
                  objectFit="contain"
                  alt={post.title}
                />
              :
              <Image
                src={`/images/testimg.png`}
                layout="fill"
                objectFit="contain"
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
      <style jsx="true">{`
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
          width: 150px;
          min-width: 150px;
        }
      `}</style>
    </>
  )
}
