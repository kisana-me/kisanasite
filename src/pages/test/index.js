import Head from "@/components/Head"
import Link from "next/link"
import { useState, useEffect } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

export default function index() {

  return (
    <>
      <Head
      title="test"
      description="test"
      url="/test/"
      />
      <div className="wrap">
        
      <div><div style={{ color: 'red' }}>!</div><p>これは、テストページです</p></div>

      </div>
      <style jsx>{`
        .wrap {
          padding: 50px 50px 0;
        }
        
      `}</style>
    </>
  )
}