import Link from 'next/link'
import { use, useEffect } from 'react'

export default function Index() {
  useEffect(() => {
    setTitle('Debug')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="heading">
        <h1>Debug</h1>
        <p>デバッグ</p>
      </div>
      <p>This is a debug page.</p>
      <hr />
      <h1>Header 1 / ヘッダー1</h1>
      <p>Paragraph / 段落</p>
      <h2>Header 2 / ヘッダー2</h2>
      <p>Paragraph / 段落</p>
      <h3>Header 3 / ヘッダー3</h3>
      <p>Paragraph / 段落</p>
      <hr />
      <Link href="/">Next Link</Link>
      <hr />
      <div>
        <section style={{ color: 'var(--theme-hsl-color)' }}>theme-color:</section>
        <div className="color-box theme-color"></div>
      </div>
      <div>
        <section style={{ color: 'var(--theme-background-1-hsl-color)' }}>theme-background-1-color:</section>
        <div className="color-box theme-background-1-color"></div>
      </div>
      <div>
        <section style={{ color: 'var(--theme-background-2-hsl-color)' }}>theme-background-2-color:</section>
        <div className="color-box theme-background-2-color"></div>
      </div>
      <div>
        <section style={{ color: 'var(--theme-background-3-hsl-color)' }}>theme-background-3-color:</section>
        <div className="color-box theme-background-3-color"></div>
      </div>
      <div>
        <section style={{ color: 'var(--theme-mode-base-rgb-color)' }}>theme-mode-base-color:</section>
        <div className="color-box theme-mode-base-color"></div>
      </div>
      <div>
        <section style={{ color: 'var(--theme-mode-accent-rgb-color)' }}>theme-mode-accent-color:</section>
        <div className="color-box theme-mode-accent-color"></div>
      </div>
      <div>
        <section style={{ color: 'var(--inconspicuous-rgb-color)' }}>inconspicuous-color:</section>
        <div className="color-box inconspicuous-color"></div>
      </div>
      <style jsx>{`
        .color-box {
          width: 50px;
          height: 50px;
        }
        .theme-color {
          background: var(--theme-hsl-color);
        }
        .theme-background-1-color {
          background: var(--theme-background-1-hsl-color);
        }
        .theme-background-2-color {
          background: var(--theme-background-2-hsl-color);
        }
        .theme-background-3-color {
          background: var(--theme-background-3-hsl-color);
        }
        .theme-mode-base-color {
          background: var(--theme-mode-base-rgb-color);
        }
        .theme-mode-accent-color {
          background: var(--theme-mode-accent-rgb-color);
        }
        .inconspicuous-color {
          background: var(--inconspicuous-color);
        }
      `}</style>
    </>
  )
}
