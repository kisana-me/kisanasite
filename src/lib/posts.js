import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import hljs from "highlight.js"
// MD処理系
import MDI from 'markdown-it'
import MDIC from 'markdown-it-container'//:::warning:::
import MDEM from 'markdown-it-emoji'//:)
import MDMR from 'markdown-it-mark'//==marked==<mark>
import MDIN from 'markdown-it-ins'//++inserted++<ins>
import MDAB from 'markdown-it-abbr'//*[HTML]: Hyper Text Markup Language<abbr title=
import MDDE from 'markdown-it-deflist'//定義記述
import MDSP from 'markdown-it-sup'//29^th^
import MDSB from 'markdown-it-sub'//H~2~0
import MDFO from 'markdown-it-footnote'//[^1] [^1]: Here
import MDMT from 'markdown-it-multimd-table'//
import MDTO from 'markdown-it-table-of-contents'//[[toc]]
import MDTL from 'markdown-it-task-lists'//[ ] or [x]

const postsDirectory = path.join(process.cwd(), 'posts')

export function getTags() {
  const allPosts = getSortedPostsData()[0]
  let tags = [];
  allPosts.forEach((post) => {
    tags = [...tags, ...post.tag]
  })
  const setTags = [...new Set(tags)];
  return setTags.sort();
}

export async function getAssociatedPosts(tag) {
  const allPosts = getSortedPostsData()[0]
  const associatedPosts = allPosts.filter((data) => data.tag.includes(tag))
  return associatedPosts
}

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '')
    const fileContents = fs.readFileSync(`${postsDirectory}/${fileName}`, 'utf8')
    const matterResult = matter(fileContents)
    return { slug, ...matterResult.data }
  })
  const sortedDate = allPostsData.sort((postA, postB) =>
    new Date(postA.date) > new Date(postB.date) ? -1 : 1
  )
  const sortedUpdate = allPostsData.concat().sort((postA, postB) =>
    new Date(postA.update) > new Date(postB.update) ? -1 : 1
  )
  return ( [sortedDate, sortedUpdate] )
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  var md = new MDI({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="hljs"><span>lang:' + lang + '</span><br /><code>' +
                 hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                 '</code></pre>'
        } catch (__) {}
      }
      return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    },
    html: true,
    linkify: true,
    breaks: true,
    typographer: true
  })
  .use(MDEM) // emoji
  .use(MDMR) // mark
  .use(MDIN) // ins
  .use(MDAB) // abbr
  .use(MDDE) // deflist
  .use(MDSP) // sup
  .use(MDSB) // sub
  .use(MDFO) // footnote
  .use(MDIC, 'info') //container
  .use(MDIC, 'success')
  .use(MDIC, 'warning')
  .use(MDIC, 'danger')
  .use(MDMT,{
      multiline:  true,
      rowspan:    true,
      headerless: true
    }) // multimd table
  .use(MDTO,{
      transformLink: (href) => {
        return ("")
      },
      containerHeaderHtml: '<div class="toc-container-header">目次</div>'
    }) // table of contents
  .use(MDTL) // task lists
  const processedContent = await md.render(matterResult.content)
  const contentHtml = processedContent.toString()
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}