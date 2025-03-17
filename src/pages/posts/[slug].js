import Image from 'next/image'
import { getAllPostIds, getPostData, getSortedPostsData } from '@/lib/posts'
import { useEffect } from 'react'
import { usePageContext } from "@/contexts/PageContext"
import Link from 'next/link'
import parse from 'html-react-parser'

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const allPostsData = getSortedPostsData()
  const postData = await getPostData(params.slug)
  return { props: { postData, sortedDate: allPostsData[0] } }
}

export default function Post({ postData, sortedDate }) {
  const { setTitle, setDescription, setType, setImageUrl } = usePageContext()
  useEffect(()=>{
    setTitle(postData.title)
    setDescription(postData.description)
    setType('article')
    setImageUrl(postData.image)
  }, [])

  return (
    <div className="postPageContainer">
      <div className="postContainer">
        <div className="postImage">
          {postData.image ? 
            <Image src={`/images/${postData.id}/${postData.image}`} alt={postData.title} sizes="100vw" priority={true} fill />
          :
            <Image src={`/images/apples.webp`} alt="コンテンツなし" sizes="100vw" priority={true} fill/>
          }
        </div>
        <h1>{postData.title}</h1>
        <div>ID:{ postData.id }</div>
        <div>投稿:{ postData.date }</div>
        <div>更新:{ postData.update }</div>
        <div>タグ:{ postData.tag.map((t)=> <Link key={t} href={'/tags'}><span>{t}</span></Link> ) }</div>
        <div>{postData.description}</div>
        {parse(postData.contentHtml)}
      </div>
      <div className="pathContainer">
        {sortedDate.map((post) => (
          <Link key={ post.slug } href={ "/posts/" + post.slug }>
            <div className="post">
              <div className="pathPostImage">
                {post.image ?
                  <Image src={`/images/${post.slug}/${post.image}`} alt={post.title} sizes="30vw" fill />
                :
                <Image src={`/images/apples.webp`} alt="コンテンツなし" sizes="30vw" fill/>
                }
              </div>
              <div className="pathPostTxt">
                <div className="pathTxt">{ post.title }</div>
                <div className="pathTxt">投稿:{ post.date }</div>
                <div className="pathTxt">タグ:{ post.tag.map((t)=> <span key={t}>{t}</span> ) }</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <style jsx>{`
        .postPageContainer{
          padding: 50px 0 0 0;
          display: flex;
          justify-content: space-around;
        }
        .postContainer {
          margin: 7px;
          width: 60%;
        }
        .postImage {
          width: 100%;
        }
        .pathContainer {
          width: 40%;
          max-width: 400px;
          margin: 7px;
        }
        .post {
          display: flex;
          margin: 7px;
        }
        .pathPostImage {
          width: 150px;
        }
        .pathPostTxt {
          width: 50%;
        }
        .pathTxt {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        @media screen and (max-width: 830px) {
          /* 830px以下 */
          .postPageContainer{
            display: block;
          }
          .postContainer {
            width: auto;
          }
          .pathContainer {
            width: auto;
            max-width: none;
          }
        }
      `}</style>
    </div>
  )
}