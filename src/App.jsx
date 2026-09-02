import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'

import { Navbar, Welcome, Dock, Home, Loader, SearchOverlay, MobileApp } from '#components'
import { Terminal, Safari, Resume, Finder, Text, Image, Contact, Photos, Settings } from '#windows'
import { useEffect, useState } from 'react'


gsap.registerPlugin(Draggable)

const MOBILE_QUERY = '(max-width: 768px)'

const App = () => {

  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const handleChange = (e) => setIsMobile(e.matches);

    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  return (
    <>
      {
        loading && (
          <Loader
            onComplete={() => {
              setLoading(false);
            }}
          />
        )
      }
      {isMobile ? (
        <MobileApp />
      ) : (
        <main>
          <Navbar />
          <Welcome />
          <Dock />
          <Terminal />
          <Safari />
          <Resume />
          <Finder />
          <Text />
          <Image />
          <Contact />
          <Home />
          <Photos />
          <Settings />
          <SearchOverlay />
        </main>
      )}
    </>
  )
}

export default App