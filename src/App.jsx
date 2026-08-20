import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'

import { Navbar, Welcome, Dock, Home, Loader, SearchOverlay  } from '#components'
import { Terminal, Safari, Resume, Finder, Text, Image, Contact, Photos, } from '#windows'
import { useState } from 'react'


gsap.registerPlugin(Draggable)

const App = () => {
  
  const [loading, setLoading] = useState(true);

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
        <SearchOverlay />
      </main>
    </>
  )
}

export default App