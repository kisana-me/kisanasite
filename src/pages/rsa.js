import { useState } from "react"
import jwkToPem from "jwk-to-pem"
import {pem2jwk, jwk2pem} from "pem-jwk"

export default function rsa() {
  const [publicKey, setPublicKey] = useState('')
  const [privateKey, setPrivateKey] = useState('')
  const [publicKeyPem, setPublicKeyPem] = useState('')
  const [privateKeyPem, setPrivateKeyPem] = useState('')
  async function generateKeyPairs() {
    const keyPair = await window.crypto.subtle.generateKey(
      {
        name: "RSA-PSS",
        modulusLength: 2048,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: { name: "SHA-256" },
      },
      true,
      ["sign", "verify"]
    )
    const publicKeyJwk = await window.crypto.subtle.exportKey("jwk", keyPair.publicKey)
    const privateKeyJwk = await window.crypto.subtle.exportKey("jwk", keyPair.privateKey)
    setPublicKey(JSON.stringify(publicKeyJwk))
    setPrivateKey(JSON.stringify(privateKeyJwk))
    setPublicKeyPem(jwk2pem(publicKeyJwk))
    setPrivateKeyPem(jwk2pem(privateKeyJwk))
  }
  const [formJwkPublic, setFormJwkPublic] = useState()
  const [formPemPublic, setFormPemPublic] = useState()
  const [formJwkPrivate, setFormJwkPrivate] = useState()
  const [formPemPrivate, setFormPemPrivate] = useState()
  const pemPublickSubmit = (event) => {
    event.preventDefault()
    setFormJwkPublic(pem2jwk(formPemPublic))
  }
  const pemPrivateSubmit = (event) => {
    event.preventDefault()
    setFormJwkPrivate(pem2jwk(formPemPrivate))
  }

  return (
    <>
      <h1>Generate RSA-PPS</h1>
      <button onClick={generateKeyPairs}>Generate</button>
      <br />
      <span>jwk公開鍵</span>
      <div className="key jwk">
        <textarea rows="20" cols="50" defaultValue={publicKey} />
      </div>
      <span>jwk秘密鍵</span>
      <div className="key jwk">
        <textarea rows="20" cols="50" defaultValue={privateKey} />
      </div>
      <span>pem公開鍵</span>
      <div className="key pem">
        <textarea rows="20" cols="50" defaultValue={publicKeyPem} />
      </div>
      <span>pem秘密鍵</span>
      <div className="key pem">
        <textarea rows="20" cols="50" defaultValue={privateKeyPem} />
      </div>
      <form onSubmit={pemPublickSubmit}>
        <label>
          pem公開鍵:
          <textarea rows="20" cols="50" value={formPemPublic} onChange={e=>{setFormPemPublic(e.target.value)}} />
        </label>
        <button type="submit">送信</button>
      </form>
      <form onSubmit={pemPrivateSubmit}>
        <label>
          pem秘密鍵:
          <textarea rows="20" cols="50" value={formPemPublic} onChange={e=>{setFormPemPrivate(e.target.value)}} />
        </label>
        <button type="submit">送信</button>
      </form>
      <span>jwk公開鍵</span>
      <div className="key jwk">
        <textarea rows="20" cols="50" defaultValue={JSON.stringify(formJwkPublic)} />
      </div>
      <span>jwk秘密鍵</span>
      <div className="key jwk">
        <textarea rows="20" cols="50" defaultValue={JSON.stringify(formJwkPrivate)} />
      </div>
      <style jsx>{`
        .key {
          width: 500px;
          overflow: scroll;
        }
      `}</style>
    </>
  )
}