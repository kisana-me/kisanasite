import { getTags, getAssociatedPosts } from '../../lib/posts'
import React , { useEffect, useState } from 'react'
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
    return (jsonOutput)
  }
  const result = await allPostsAndTags()
  console.log(result)
  return {
    props: {
      result,
    },
  }
}

export default function Tags({result}) {
  return (
    <>
    <div>
      <h1>タグ一覧</h1>
      {Object.keys(JSON.parse(result)).map((tag) => (
        <div key={tag}>
          <h2 id={tag}>#{tag}</h2>
          <ul>
            {JSON.parse(result)[tag].map((post) => (
              <Link key={post.slug} href={ "/post/" + post.slug }>
                {post.title}
              </Link>
            ))}
          </ul>
        </div>
      ))}
    </div>
    </>
  )
}