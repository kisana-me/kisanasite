import Image from 'next/image'
import { getAllPostIds, getPostData, getSortedPostsData } from '../../lib/posts'
import Head from "../../components/Head"
import Link from 'next/link'
import rehypeParse from 'rehype-parse'
import rehypeReact from 'rehype-react'
import { useState, useEffect, Fragment, createElement } from 'react'
import { unified } from 'unified'

const MyLink = ({ children, href }) => {
  return (
    <Link href={href}>
      {children}
    </Link>
  )
}

const MyImage = ({ src, alt }) => {
  return <Image src={src} alt={alt} layout="fill" objectFit="contain" />
}

function toReactNode(content) {
  const [Content, setContent] = useState(Fragment);

  useEffect(() => {
    const processor = unified()
      .use(rehypeParse, {
        fragment: true,
      })
      .use(rehypeReact, {
        createElement,
        Fragment,
        components: {
          a: MyLink,
          img: MyImage,
        },
      })
      .processSync(content);

    setContent(processor.result);
  }, [content]);

  return Content;
}

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
  return (
    <div className="postPageContainer">
      <div className="postContainer">
        <Head
        title={postData.title}
        description={postData.description}
        url={"/post/" + postData.slug}
        image={'/images/' + postData.slug + '/' + postData.image}
        type = "article"
        />
        <div className="postImage">
          {postData.image ? 
            <Image
              src={`/images/${postData.id}/${postData.image}`}
              layout="fill"
              objectFit="contain"
              alt={postData.title}
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
        <h1>{postData.title}</h1>
        <div>ID:{ postData.id }</div>
        <div>投稿:{ postData.date }</div>
        <div>更新:{ postData.update }</div>
        <div>タグ:{ postData.tag.map((t)=> <Link key={t} href={'/post/tags#' + t}><span>{t}</span></Link> ) }</div>
        <div>{postData.description}</div>
        {toReactNode(postData.contentHtml)}
      </div>
      <div className="pathContainer">
        {sortedDate.map((post) => (
          <Link key={ post.slug } href={ "/post/" + post.slug }>
            <div className="post">
              <div className="pathPostImage">
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
              <div className="pathPostTxt">
                <div className="pathTxt">{ post.title }</div>
                <div className="pathTxt">投稿:{ post.date }</div>
                <div className="pathTxt">タグ:{ post.tag.map((t)=> <span key={t}>{t}</span> ) }</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <style jsx="true">{`
        .postPageContainer{
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