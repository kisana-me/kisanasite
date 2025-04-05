import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import hljs from "highlight.js"
// MD処理系
import MDI from 'markdown-it'
import MDIC from 'markdown-it-container'//:::warning:::
import MDEM from 'markdown-it-emoji'//:) //つかえない？
import MDMR from 'markdown-it-mark'//==marked==<mark>
import MDIN from 'markdown-it-ins'//++inserted++<ins>
import MDAB from 'markdown-it-abbr'//*[HTML]: Hyper Text Markup Languageが<abbr title=
import MDDE from 'markdown-it-deflist'//定義記述
import MDSP from 'markdown-it-sup'//29^th^
import MDSB from 'markdown-it-sub'//H~2~0
import MDFO from 'markdown-it-footnote'//[^1] [^1]: Here
import MDMT from 'markdown-it-multimd-table'//
import MDTO from 'markdown-it-table-of-contents'//[[toc]]
import MDTL from 'markdown-it-task-lists'//[ ] or [x]

export function getSortedMdsData(dir) {
  const fileNames = fs.readdirSync(path.join(process.cwd(), dir))
  const allPostsData = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '')
    const fileContents = fs.readFileSync(`${path.join(process.cwd(), dir)}/${fileName}`, 'utf8')
    const matterResult = matter(fileContents)
    return { slug, ...matterResult.data }
  })
  const sortedDate = allPostsData.sort((postA, postB) =>
    postA.order < postB.order ? -1 : 1
    // new Date(postA.date) > new Date(postB.date) ? -1 : 1
  )
  return (sortedDate)
}

export function getAllMdIds(dir) {
  const fileNames = fs.readdirSync(path.join(process.cwd(), dir))
  return fileNames.map(fileName => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getMdData(dir, id) {
  const fullPath = path.join(path.join(process.cwd(), dir), `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  const md = new MDI({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="hljs"><span>lang:' + lang + '</span><br /><code>' +
                 hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                 '</code></pre>'
        } catch (__) {}
      }
      return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    },
    html: true,
    linkify: true,
    breaks: true,
    typographer: true
  })
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
    contentHtml: processedContent,
    ...matterResult.data
  }
}