import { useState, useEffect } from 'react'
import { usePageContext } from '@/contexts/page_context'
import Block from '@/components/tools/blockchain/Block'

// const generateHash = async (message) => {
//   const encoder = new TextEncoder()
//   const data = encoder.encode(message)
//   const hashBuffer = await crypto.subtle.digest('SHA-256', data)
//   const hashArray = Array.from(new Uint8Array(hashBuffer))
//   const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('')
//   return hashHex
// }

export default function BlockchainMaker() {
  const { setTitle } = usePageContext()
  useEffect(() => {
    setTitle('Blockchain Maker')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [blocks, setBlocks] = useState([{ blockNumber: 1, previousHash: '0000000000000000000000000000000000000000000000000000000000000000' }])
  const addBlock = (previousHash) => {
    setBlocks([...blocks, { blockNumber: blocks.length + 1, previousHash }])
  }
  const [difficulty, setDifficulty] = useState(3)

  return (
    <>
      <div className="wrap">
        <div className="container">
          <h1>Blockchain Maker</h1>
          <p>難易度は、先頭から「0」が何個続くhash値を探すかであり、react上の計算が遅いので1~3の間に設定することをおすすめします。</p>
          <p>ハッシュ化する文字列は、単にブロック番号、ナンス、テキスト、前ハッシュ値をスペーサー等入れず順に組み合わせたものです。</p>

          <input type="number" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} />
          <br />
          <div className="blocks">
            {blocks.map((block, index) => (
              <Block
                key={index}
                difficulty={difficulty}
                blockNumber={block.blockNumber}
                previousHash={block.previousHash}
                onMine={(newHash) => addBlock(newHash)}
              />
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .wrap {
          padding: 50px 0 0 0;
        }
        .container {
          padding: 20px;
        }
        .blocks {
          display: flex;
          overflow-x: auto;
        }
      `}</style>
    </>
  )
}
