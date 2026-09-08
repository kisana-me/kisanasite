import Link from 'next/link'
import { useEffect } from 'react'
import { usePageContext } from '@/contexts/page_context'

export default function Index() {
  const { setTitle } = usePageContext()
  useEffect(() => {
    setTitle('Tools')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="heading">
        <h1>Tools</h1>
        <p>ツール一覧</p>
      </div>
      <ul>
        <li>
          <Link href="/tools/blockchain-maker">Blockchain Maker</Link>
        </li>
        <li>
          <Link href="/tools/markdown-editor">Markdown Editor</Link>
        </li>
        <li>
          <Link href="/tools/rsa-key-generator">RSA Key Generator</Link>
        </li>
      </ul>
    </>
  )
}
