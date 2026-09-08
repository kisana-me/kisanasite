import { useCallback, useEffect, useRef, useState } from 'react'
import { FORMS } from '@/lib/config'

/**
 * お問い合わせフォーム。送り先は CMS の `POST /api/inquiries`。
 *
 * **サイトはボディで指定しない。** CMS が `Origin` から決める（そうしないと
 * 他サイトの名前で投げ込めてしまう）。届いた内容は `status='open'` で入り、
 * **公開サイトには1件も出ない**ので、承認やビルドの話は出さない。
 */

const TURNSTILE_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileReady&render=explicit'

/** Turnstile の api.js は1枚だけ読む。読み終わるまでは同じ Promise を返す */
let turnstileReady = null

function loadTurnstile() {
  if (turnstileReady) return turnstileReady
  turnstileReady = new Promise((resolve) => {
    if (window.turnstile) return resolve()
    window.onTurnstileReady = () => resolve()
    const el = document.createElement('script')
    el.src = TURNSTILE_SRC
    el.async = true
    // 読めなくても解決する。ウィジェットが出ないだけで、送信は CMS が弾く
    el.addEventListener('error', () => resolve())
    document.head.appendChild(el)
  })
  return turnstileReady
}

const EMPTY = { name: '', address: '', subject: '', body: '' }

export default function InquiryForm() {
  const [values, setValues] = useState(EMPTY)
  const [token, setToken] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const holder = useRef(null)
  const rendered = useRef(false)

  const needsToken = Boolean(FORMS.turnstileSiteKey)

  useEffect(() => {
    if (!needsToken || rendered.current) return
    rendered.current = true
    let cancelled = false
    loadTurnstile().then(() => {
      if (cancelled || !holder.current) return
      window.turnstile?.render(holder.current, {
        sitekey: FORMS.turnstileSiteKey,
        callback: (value) => setToken(value),
        'error-callback': () => setToken(''),
        'expired-callback': () => setToken(''),
      })
    })
    return () => {
      cancelled = true
    }
  }, [needsToken])

  const change = (key) => (event) => setValues((current) => ({ ...current, [key]: event.target.value }))

  /** CMS が返す `{ error: { code, message } }` を読む。読めなければ状態から言う */
  const errorMessage = useCallback(async (res) => {
    try {
      const data = await res.json()
      if (data?.error?.message) return data.error.message
    } catch {
      // JSON で返ってこないこともある（CORS で落ちた等）
    }
    if (res.status === 429) return '続けて送りすぎです。しばらく待ってからお試しください。'
    if (res.status === 403) return 'このサイトからは受け付けていません。'
    return '送信できませんでした。時間をおいて試してください。'
  }, [])

  const onSubmit = async (event) => {
    event.preventDefault()
    if (sending || sent) return
    setSending(true)
    setMessage('送信中…')

    // **キーは CMS が受け取る名前そのまま。** 詰め替えると片方だけ直したときに黙ってずれる
    const payload = { ...values }
    if (token) payload['cf-turnstile-response'] = token

    try {
      const res = await fetch(`${FORMS.apiBase}/api/inquiries`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        setMessage(await errorMessage(res))
        setSending(false)
        return
      }
      setValues(EMPTY)
      setMessage('送信しました。返事が要る場合は、いただいた連絡先へお送りします。')
      // **送信後は押せないままにする。** Turnstile のトークンは1回限りで、
      // そのまま二度目を押しても検証で弾かれる
      setSent(true)
    } catch {
      setMessage('送信できませんでした。通信を確かめて、時間をおいて試してください。')
      setSending(false)
    }
  }

  const disabled = sending || sent || (needsToken && !token)

  return (
    <>
      <form className="inquiry-form" onSubmit={onSubmit}>
        <div className="form-row">
          <label htmlFor="inquiry-name">お名前</label>
          <input
            id="inquiry-name"
            type="text"
            maxLength={50}
            autoComplete="name"
            placeholder="お名前"
            value={values.name}
            onChange={change('name')}
          />
        </div>

        <div className="form-row">
          <label htmlFor="inquiry-address">連絡先</label>
          <input
            id="inquiry-address"
            type="text"
            maxLength={200}
            autoComplete="email"
            placeholder="メールアドレスなど"
            value={values.address}
            onChange={change('address')}
          />
          <p className="form-hint">返事が要るときは入れてください。公開されません。</p>
        </div>

        <div className="form-row">
          <label htmlFor="inquiry-subject">用件</label>
          <input
            id="inquiry-subject"
            type="text"
            maxLength={120}
            placeholder="サイトの誤りについて／依頼 など"
            value={values.subject}
            onChange={change('subject')}
          />
        </div>

        <div className="form-row">
          <label htmlFor="inquiry-body">
            内容<span className="form-required">必須</span>
          </label>
          <textarea
            id="inquiry-body"
            rows={8}
            maxLength={4000}
            required
            placeholder="内容"
            value={values.body}
            onChange={change('body')}
          />
        </div>

        {needsToken && <div className="form-turnstile" ref={holder} />}

        <p className="form-note">送信した内容は公開されません。サイトの管理者だけが読みます。</p>
        <p className="form-note">スパム対策のため、送信時のIPアドレスを保存します。</p>

        <button type="submit" disabled={disabled}>
          送信
        </button>
        {message && (
          <p className="form-message" role="status">
            {message}
          </p>
        )}
      </form>
      <style jsx>{`
        .inquiry-form {
          width: 100%;
          max-width: 700px;
          padding: 10px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .form-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        label {
          font-weight: bold;
          font-size: small;
        }
        input,
        textarea {
          width: 100%;
          padding: 8px 10px;
          box-sizing: border-box;
          border: 1px solid var(--inconspicuous-color);
          border-radius: 7px;
          background: transparent;
          color: inherit;
          font: inherit;
        }
        textarea {
          resize: vertical;
        }
        .form-required {
          margin-left: 6px;
          padding: 1px 5px;
          border-radius: 4px;
          background: #e05252;
          color: #fff;
          font-size: x-small;
        }
        .form-hint,
        .form-note {
          margin: 0;
          color: var(--inconspicuous-color);
          font-size: x-small;
        }
        .form-turnstile {
          min-height: 65px;
        }
        button {
          align-self: flex-start;
          padding: 8px 20px;
          border: 1px solid var(--inconspicuous-color);
          border-radius: 7px;
          background: transparent;
          color: inherit;
          font: inherit;
          cursor: pointer;
        }
        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .form-message {
          margin: 0;
          font-size: small;
        }
      `}</style>
    </>
  )
}
