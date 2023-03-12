import Link from 'next/link'
import React, {useContext} from 'react'
import {darkContext, setDarkContext} from '../pages/_app'

export default function Header() {
  const isDark = useContext(darkContext)
  const modeTrigger = useContext(setDarkContext)
  return (
    <header>
      <div className="top-left">
        <div className="logo">
          <Link href="/">
            <div className="home">
              HOME
            </div>
          </Link>
        </div>
      </div>
      <div className="top-right">
        <nav>
          <ul>
            <Link href="/about"><li>ABOUT</li></Link>
            <Link href="/work"><li>WORK</li></Link>
            <Link href="/post"><li>POST</li></Link>
          </ul>
        </nav>
        <div className="mode-toggle">
          <button className={isDark ? "dark-button" : "light-button"} onClick={modeTrigger}>{isDark ? "🌙" : "☀️"}</button>
        </div>
      </div>
      <style jsx="true">{`
      header {
        backdrop-filter: blur(12px);
        display: flex;
        justify-content: space-around;
        top: 0;
        position: fixed;
        width: 100%;
        height: 50px;
        z-index: 1;
      }
      .top-left {
        display: flex;
        justify-content: center;
      }
      .logo {
        height: 44px;
        padding:3px;
      }
      .home {
        padding: 10px;
        color: #89ae05;
      }
      .top-right {
        display: flex;
      }
      nav{
        display: flex;
        justify-content: center;
      }
      ul {
        display: flex;
        padding: 0;
        margin: auto;
        width: 250px;
        justify-content: space-around;
      }
      li {
        display: block;
        padding: 10px;
        color: #7847da;
        border-radius: 3px;
        transition: all 0.5s 0s ease;
      }
      li:hover {
        box-shadow: 4px 4px 7px 0 rgb(0 0 0 / 25%);
        background: #ffffff;
        transform: translate(-.5px, -.5px);
      }
      .mode-toggle {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .dark-button{
        width: 30px;
        height: 30px;
        border: 3px solid #fff;
        background: #395391;
        margin: auto;
        border-radius: 15px;
      }
      .light-button{
        width: 30px;
        height: 30px;
        border: 3px solid #000;
        background: #fff9cb;
        margin: auto;
        border-radius: 15px;
      }
      `}</style>
    </header>
  )
}