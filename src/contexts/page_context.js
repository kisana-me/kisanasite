"use client"
import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const PageContext = createContext()

export const PageContextProvider = ({ children }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('kisana')
  const [description, setDescription] = useState('kisana\'s website')
  const [keywords, setKeywords] = useState('kisana, kisana_me, kisana.')
  const [robots, setRobots] = useState('index, follow')
  const [type, setType] = useState('website')
  const [imagePath , setImagePath] = useState('')
  const [imageUrl , setImageUrl] = useState('')
  const [card, setCard] = useState('summary_large_image')
  const [id, setId] = useState('kisana_me')
  const [url, setUrl] = useState('')
  const [mainTagTopPadding, setMainTagTopPadding] = useState(true)

  const router = useRouter()

  useEffect(() => {
    setUrl(new URL(router.asPath, process.env.NEXT_PUBLIC_APP_URL || 'http://kisana.me/').toString())
  }, [router])

  return (
    <PageContext.Provider value={{
      title, setTitle,
      author, setAuthor,
      description, setDescription,
      keywords, setKeywords,
      robots, setRobots,
      type, setType,
      imagePath , setImagePath,
      imageUrl , setImageUrl,
      card, setCard,
      id, setId,
      url, setUrl,
      mainTagTopPadding, setMainTagTopPadding
    }}>
      {children}
    </PageContext.Provider>
  )
}

export const usePageContext = () => useContext(PageContext)
