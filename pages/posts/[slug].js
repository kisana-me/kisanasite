import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import parse from 'html-react-parser'
import { getPost, getPostSlugs, getPosts } from '@/lib/site'
import { formatDateTime } from '@/lib/format'
import { usePageContext } from '@/contexts/page_context'
import MiniCard from '@/components/mini_card'
import TableOfContents from '@/components/table_of_contents'

export async function getStaticPaths() {
  return {
    paths: getPostSlugs().map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  return { props: { post: getPost(params.slug), posts: getPosts() } }
}

export default function Post({ post, posts }) {
  const { setTitle, setDescription, setType, setImageUrl } = usePageContext()
  useEffect(() => {
    setTitle(post.title)
    setDescription(post.summary)
    setType('article')
    setImageUrl(post.image)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="post-container">
        <div className="post-main">
          <div className="post-image">
            <Image src={post.image ? post.image : '/images/no-image.png'} alt={post.title} priority={true} fill />
          </div>
          <h1>{post.title}</h1>
          <div>投稿:{formatDateTime(post.publishedAt)}</div>
          {post.editedAt && <div>更新:{formatDateTime(post.editedAt)}</div>}
          {post.tags.length > 0 && (
            <div>
              タグ:
              {post.tags.map((tag) => (
                <Link key={tag.slug} href={`/tags#${tag.slug}`}>
                  <span>{tag.name}</span>
                </Link>
              ))}
            </div>
          )}
          <div>{post.summary}</div>
          <TableOfContents items={post.toc} />
          {parse(post.contentHtml)}
        </div>
        <div className="post-aside">
          {posts.map((other) => (
            <Link key={other.slug} href={'/posts/' + other.slug} className="post-aside-posts">
              <MiniCard title={other.title} image={other.image} summary={other.summary} />
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
