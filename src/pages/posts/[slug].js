import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import parse from 'html-react-parser'
import { getAllPostIds, getPostData, getSortedPostsData } from '@/lib/posts'
import { usePageContext } from '@/contexts/page_context'
import MiniCard from '@/components/mini_card'

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const allPostsData = getSortedPostsData()
  const postData = await getPostData(params.slug)
  return { props: { postData, sortedDate: allPostsData[0] } }
}

export default function Post({ postData, sortedDate }) {
  const { setTitle, setDescription, setType, setImageUrl } = usePageContext()
  useEffect(() => {
    setTitle(postData.title)
    setDescription(postData.description)
    setType('article')
    setImageUrl(postData.image)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="post-container">
        <div className="post-main">
          <div className="post-image">
            <Image
              src={postData.image ? `/images/${postData.id}/${postData.image}` : '/images/no-image.png'}
              alt={postData.title}
              priority={true}
              fill
            />
          </div>
          <h1>{postData.title}</h1>
          <div>ID:{postData.id}</div>
          <div>投稿:{postData.date}</div>
          <div>更新:{postData.update}</div>
          <div>
            タグ:
            {postData.tag.map((t) => (
              <Link key={t} href={'/tags'}>
                <span>{t}</span>
              </Link>
            ))}
          </div>
          <div>{postData.description}</div>
          {parse(postData.contentHtml)}
        </div>
        <div className="post-aside">
          {sortedDate.map((post) => (
            <Link key={post.slug} href={'/posts/' + post.slug} className="post-aside-posts">
              <MiniCard title={post.title} image={post.image} summary={post.description} />
            </Link>
          ))}
        </div>
      </div>
      <style jsx>{`
        .post-container {
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
        }
        .post-main {
          width: 100%;
          max-width: 700px;
          padding: 10px;
          box-sizing: border-box;
        }
        :global(.post-main img) {
          width: 100%;
        }
        .post-image {
          width: 100%;
          display: flex;
        }
        .post-aside {
          width: 100%;
          padding: 10px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        :global(.post-aside-posts) {
          width: 100%;
          max-width: 400px;
          text-decoration: none;
        }
        @media screen and (min-width: 1000px) {
          .post-container {
            flex-direction: row;
          }
          .post-aside {
            max-width: 400px;
          }
        }
      `}</style>
    </>
  )
}
