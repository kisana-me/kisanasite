import Link from 'next/link'
import { useEffect } from 'react'
import { usePageContext } from '@/contexts/page_context'

export default function Index() {
  const { setTitle } = usePageContext()
  useEffect(() => {
    setTitle('ツール一覧')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <h1>Tools</h1>
      <span>ツール一覧</span>
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
