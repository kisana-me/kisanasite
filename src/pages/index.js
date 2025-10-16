import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef } from 'react'
import { usePageContext } from "@/contexts/page_context"
import { useEffect } from 'react'
import fs from 'fs'
import path from 'path'
import HeroSection from '@/components/home/hero_section'

export default function index({ exhibitsData }) {
  const { setTitle, setMainTagTopPadding } = usePageContext()

  useEffect(()=>{
    setTitle('')
    setMainTagTopPadding(false)
  }, [])

  return (
    <>
      <HeroSection exhibitsData={exhibitsData} />
      <div className="sub-container">
        <div className='heading-wrap'>
          <h2>Created</h2>
        </div>
        <div className='created-main-container created-card'>
          <Image src="/images/amiverse/amiverse-1.png" alt="object" style={{ objectFit: 'cover', objectPosition: 'center' }} fill />
          <div className='created-card-plate'>
            <div className='created-card-title'>Amiverse</div>
            <div className='created-card-content'>ソーシャルメディア</div>
          </div>
        </div>
        <div className='created-list-container'>
          <div className='created-list created-card'>
            <Image src="/images/ivecolor/ivecolor-1.png" alt="object" style={{ objectFit: 'cover', objectPosition: 'center' }} sizes="30vw" fill />
            <div className='created-card-plate'>
              <div className='created-card-title'>IVECOLOR</div>
              <div className='created-card-content'>ブログ</div>
            </div>
          </div>
          <div className='created-list created-card'>
            <Image src="/images/anyur/anyur-1.png" alt="object" style={{ objectFit: 'cover', objectPosition: 'center' }} sizes="30vw" fill />
            <div className='created-card-plate'>
              <div className='created-card-title'>ANYUR</div>
              <div className='created-card-content'>総合アカウントシステム</div>
            </div>
          </div>
          <div className='created-list created-card'>
            <Image src="/images/bealive/bealive-1.png" alt="object" style={{ objectFit: 'cover', objectPosition: 'center' }} sizes="30vw" fill />
            <div className='created-card-plate'>
              <div className='created-card-title'>BeAlive.</div>
              <div className='created-card-content'>生存確認</div>
            </div>
          </div>
          <div className='created-list created-card'>
            <Image src="/images/x/x-1.png" alt="object" style={{ objectFit: 'cover', objectPosition: 'center' }} sizes="30vw" fill />
            <div className='created-card-plate'>
              <div className='created-card-title'>得句巣</div>
              <div className='created-card-content'>次世代中華風電子共同体</div>
            </div>
          </div>
          <div className='created-list created-card'>
            <Image src="/images/kisana/kisana-1.png" alt="object" style={{ objectFit: 'cover', objectPosition: 'center' }} sizes="30vw" fill />
            <div className='created-card-plate'>
              <div className='created-card-title'>KISANA:ME</div>
              <div className='created-card-content'>当サイト</div>
            </div>
          </div>
        </div>
        <div className='heading-wrap'>
          <h2>Skill</h2>
        </div>
        <div>
          <p>バックエンドにRuby on Rails、フロントエンドにNext.jsを使っていいかんじのアプリを作れる程の能力。</p>
          <p>CやRust、Pythonなども少々書けます。</p>
          <div className='skill-list-container'>
            <div className='skill-card'>
              <div className='skill-card-title'></div>
              <div className='skill-card-content'></div>
            </div>
          </div>
        </div>
        <div className='heading-wrap'>
          <h2>Activity</h2>
        </div>
        <div>
          <p>いろいろ更新してます。</p>
          <h3>ブログの更新</h3>
          <div className='activity-list-container'>
            <div className='activity-card'>
              <div className='activity-card-title'>テスト</div>
              <div className='activity-card-content'>テスト</div>
            </div>
          </div>
          <h3>Amiverseでの投稿</h3>
          <div className='activity-list-container'>
            <div className='activity-card'>
              <div className='activity-card-title'>テスト</div>
              <div className='activity-card-content'>テスト</div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .color-layer {
          position: 'relative';
          width: 100%;
          height: 100%;
          background-color: var(--background-color);
          background-image:
          radial-gradient(at 46% 50%, hsla(213,100%,68%,1) 0px, transparent 50%),
          radial-gradient(at 75% 42%, hsla(51,100%,50%,1) 0px, transparent 50%),
          radial-gradient(at 69% 70%, hsla(108,100%,66%,1) 0px, transparent 50%),
          radial-gradient(at 52% 82%, hsla(181,100%,66%,1) 0px, transparent 50%),
          radial-gradient(at 44% 19%, hsla(234,100%,65%,1) 0px, transparent 50%),
          radial-gradient(at 25% 27%, hsla(305,100%,56%,1) 0px, transparent 50%),
          radial-gradient(at 20% 51%, hsla(0,76%,46%,1) 0px, transparent 50%);
        }
        .heading-wrap {
          display: flex;
          justify-content: center;
          margin: 50px 0 20px;
        }
        .heading-wrap h2 {
          text-align: center;
          background: linear-gradient(90deg, #747eee, #d453cc 50%, #fe5597);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          border-bottom: 2px solid var(--link-color);
        }
        .created-main-container {
          height: 200px;
          margin: 20px;
          border: 2px solid var(--inconspicuous-color);
          border-radius: 7px;
        }
        .created-list-container {
          margin: 20px;
          display: flex;
          overflow-x: auto;
        }
        .created-list {
          width: 300px;
          height: 200px;
          margin-right: 20px;
          border: 2px solid var(--inconspicuous-color);
          border-radius: 7px;
          flex-shrink: 0;
        }
        .created-card {
          position: relative;
          display: flex;
          overflow: hidden;
        }
        .created-card-plate {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: rgba(var(--theme-mode-base-rgb-value), .5);
          backdrop-filter: blur(3px);
          padding: 7px;
          border-radius: 7px;
        }
        .created-card-title {
          font-weight: bold;
          font-size: 20px;
        }
        .created-card-content {
          color: var(--inconspicuous-color);
        }
      `}</style>
    </>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'home', 'exhibits.json')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const exhibitsData = JSON.parse(fileContents)

  return {
    props: {
      exhibitsData
    }
  }
}
