import { createContext, useContext, useRef, useState, useEffect } from 'react'

const ScrollbarContext = createContext()

export function ScrollbarProvider({ children }) {
  const [scrollbarVisible, setScrollbarVisible] = useState(false)
  const timeoutRef = useRef(null)
  const isDraggingRef = useRef(false)
  const scrollbarRef = useRef(null)
  const dragInfoRef = useRef({ startY: 0, startScroll: 0 })

  const showScrollbar = () => {
    setScrollbarVisible(true)
    clearTimeout(timeoutRef.current)
    if (!isDraggingRef.current) {
      timeoutRef.current = setTimeout(() => {
        setScrollbarVisible(false)
      }, 1500)
    }
  }

  const onScroll = () => {
    updateScrollbar()
    showScrollbar()
  }

  const updateScrollbar = () => {
    if (!scrollbarRef.current) return
    const htmlElement = document.documentElement
    const contentHeight = htmlElement.scrollHeight
    const viewportHeight = window.innerHeight
    const scrollRatio = viewportHeight / contentHeight
    const scrollbarHeight = Math.max(viewportHeight * scrollRatio, 30)
    scrollbarRef.current.style.height = `${scrollbarHeight}px`
    const scrolled = window.scrollY
    const maxScroll = contentHeight - viewportHeight
    const scrollProgress = scrolled / maxScroll
    const scrollbarTravel = viewportHeight - scrollbarHeight
    const scrollbarPosition = scrollProgress * scrollbarTravel
    scrollbarRef.current.style.transform = `translateY(${scrollbarPosition}px)`
  }

  const onMouseMove = (e) => {
    if (!isDraggingRef.current || !scrollbarRef.current) return
    const { startY, startScroll } = dragInfoRef.current
    const htmlElement = document.documentElement
    const contentHeight = htmlElement.scrollHeight
    const viewportHeight = window.innerHeight
    const scrollbarHeight = parseFloat(scrollbarRef.current.style.height)
    const scrollbarTravel = viewportHeight - scrollbarHeight
    const maxScroll = contentHeight - viewportHeight
    const delta = e.clientY - startY
    const scrollProgress = delta / scrollbarTravel
    const newScroll = startScroll + (scrollProgress * maxScroll)
    window.scrollTo(0, newScroll)
  }

  const onMouseDown = (e) => {
    e.preventDefault()
    if (!scrollbarRef.current) return
    isDraggingRef.current = true
    dragInfoRef.current = {
      startY: e.clientY,
      startScroll: window.scrollY
    }
    scrollbarRef.current.classList.add('dragging')
  }

  const onMouseUp = () => {
    if (!scrollbarRef.current) return
    isDraggingRef.current = false
    scrollbarRef.current.classList.remove('dragging')
    showScrollbar()
  }

  const onMouseMove2 = () => {
    showScrollbar()
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.addEventListener('scroll', onScroll)
    window.addEventListener('mousemove', onMouseMove2)
    window.addEventListener('resize', updateScrollbar)
    updateScrollbar()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouseMove2)
      window.removeEventListener('resize', updateScrollbar)
      clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleMouseDown = (e) => {
    if (scrollbarRef.current) {
      onMouseDown(e)
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', () => {
        onMouseUp()
        window.removeEventListener('mousemove', onMouseMove)
      }, { once: true })
    }
  }

  return (
    <ScrollbarContext.Provider value={null}>
      {children}
      <div
        ref={scrollbarRef}
        onMouseDown={handleMouseDown}
        className={`global-scrollbar ${scrollbarVisible ? 'visible' : ''}`}
      />
      <style jsx global>{`
        .global-scrollbar {
          position: fixed;
          top: 0;
          right: 4px;
          width: 4px;
          border-radius: 2px;
          background-color: rgba(var(--theme-mode-accent-rgb-value), 0.2);
          opacity: 0;
          transition: opacity 0.3s, width 0.2s, right 0.2s;
          cursor: pointer;
          z-index: 101;
          pointer-events: auto;
        }
        .global-scrollbar.visible {
          opacity: 1;
        }
        @media (pointer: coarse) {
          html {
            scrollbar-width: thin;
          }
          .global-scrollbar {
            display: none;
          }
        }
        @media (pointer: fine) {
          html {
            scrollbar-width: none;
          }
          .global-scrollbar {
            display: block;
          }
        }
        .global-scrollbar.visible:hover,
        .global-scrollbar.dragging {
          width: 8px;
          border-radius: 4px;
          right: 2px;
          background-color: rgba(var(--theme-mode-accent-rgb-value), 0.3);
        }
      `}</style>
    </ScrollbarContext.Provider>
  )
}