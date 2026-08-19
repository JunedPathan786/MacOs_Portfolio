import React from 'react'
import dayjs from 'dayjs'
import { navLinks, navIcons } from '#constants'
import useWindowStore from '#store/window'
import useSearchStore from '#store/search'
import useThemeStore from '#store/theme'


const Navbar = () => {
  const { openWindow } = useWindowStore()
  const { open: openSearch } = useSearchStore()
  const { toggleMode } = useThemeStore()

  const handleIconClick = (type) => {
    if (type === "search") return openSearch()
    if (type === "mode") return toggleMode()
  }

  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className='font-bold'>Juned's Portfolio</p>

        <ul>
          {
            navLinks.map(({ id, name, type }) => (
            <li key={id} onClick={() => openWindow(type)} >
              <p>{name}</p>
            </li>
          ))
          }
        </ul>
      </div>
      <div>
        <ul>
          {
            navIcons.map(({id, img, type}) => (
              <li key={id}>
                <img
                  src={img}
                  className='icons-hover'
                  alt={`icons-{id}`}
                  onClick={() => handleIconClick(type)}
                />
              </li>
            ))
          }
        </ul>
         <time>
          {dayjs().format("ddd MMM D h:mm A")}
        </time>
      </div>
    </nav>
  )
}

export default Navbar