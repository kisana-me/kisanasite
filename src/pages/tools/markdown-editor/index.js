import { useState, useEffect, Fragment } from "react"
import { usePageContext } from "@/contexts/PageContext"
import matter from 'gray-matter'
import hljs from "highlight.js"
import markdownToHtml from 'zenn-markdown-html';
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
import parse from 'html-react-parser'

function getPostData(rawData) {
  const fileContents = rawData
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
  const processedContent = md.render(matterResult.content)
  const contentHtml = processedContent.toString()
  return {
    contentHtml,
    ...matterResult.data
  }
}

export default function index() {
  const { setTitle } = usePageContext()
  useEffect(()=>{
    setTitle('Markdown Editor')
  }, [])
  const [postData, setPostData] = useState({})

  return (
    <>
      <div className="wrap">
        <h1>Markdown Editor</h1>
        <p>このフォームにマークダウン形式で記述すると下にレンダリング結果が出力されます。</p>
        <p>マークダウン処理エンジンは'markdown-it'を使用しています。</p>
        <div className="markdown">
          <textarea rows="20" cols="50" onChange={e=>{setPostData(getPostData(e.target.value))}} />
        </div>
        <div className="show-md">
          {postData.contentHtml ? parse(postData.contentHtml) : ''}
        </div>
      </div>
      <style jsx>{`
        .wrap {
          padding: 50px 0 0 0;
        }
      `}</style>
    </>
  )
}