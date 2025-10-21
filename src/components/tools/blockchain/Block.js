import { useState } from 'react'

export default function Block({ blockNumber, previousHash, onMine, difficulty }) {
  const [nonce, setNonce] = useState(0)
  const [text, setText] = useState('')
  const [hash, setHash] = useState('')
  const [mining, setMining] = useState(false)
  const [timeTaken, setTimeTaken] = useState(null) // 計算時間を保存

  const calculateHash = async (blockNumber, nonce, text, previousHash) => {
    const message = `${blockNumber}${nonce}${text}${previousHash}`

    setNonce(nonce)
    const encoder = new TextEncoder()
    const data = encoder.encode(message)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    // eslint-disable-next-line no-undef
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  }

  const mineBlock = async () => {
    setMining(true)
    setTimeTaken(null) // リセット
    const startTime = performance.now() // 計算開始時間
    let currentNonce = nonce
    let newHash = ''

    while (!newHash.startsWith('0'.repeat(difficulty))) {
      currentNonce++
      newHash = await calculateHash(blockNumber, currentNonce, text, previousHash)
    }
    const endTime = performance.now() // 計算終了時間
    const duration = (endTime - startTime) / 1000 // 秒単位の計算時間

    setNonce(currentNonce)
    setHash(newHash)
    setTimeTaken(duration.toFixed(2)) // 計算時間を秒で表示
    setMining(false)
    onMine(newHash)
  }

  return (
    <div className="block">
      <h3>Block {blockNumber}</h3>
      <label>Nonce: </label>
      <input type="number" value={nonce} disabled />
      <br />
      <label>Text: </label>
      <textarea value={text} onChange={(e) => setText(e.target.value)} disabled={mining} />
      <br />
      <label>Previous Hash:</label>
      <input type="text" value={previousHash} disabled />
      <br />
      <label>Hash:</label>
      <br />
      <input type="text" value={hash} disabled />
      <br />
      <label>Time Taken: {timeTaken ? `${timeTaken} seconds` : 'N/A'}</label>
      <br />
      <button onClick={() => mineBlock()} disabled={mining}>
        {mining ? 'Mining...' : 'Mine Block'}
      </button>
      <style jsx>{`
        .block {
          border: 1px solid black;
          padding: 20px;
          margin: 10px;
        }
      `}</style>
    </div>
  )
}
