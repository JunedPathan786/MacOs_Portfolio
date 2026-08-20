import { useEffect, useState } from 'react'

import dayjs from 'dayjs'

import { navLinks, navIcons } from '#constants'
import useWindowStore from '#store/window'
import useSearchStore from '#store/search'
import useThemeStore from '#store/theme'


const Navbar = () => {
  const { openWindow } = useWindowStore()
  const { open: openSearch } = useSearchStore()
  const { mode, setMode } = useThemeStore()
  const [time, setTime] = useState(dayjs().format("ddd MMM D h:mm A"))

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(dayjs().format("ddd MMM D h:mm A"))
    }, 30000)

    return () => clearInterval(timer)
  }, [])

  const handleIconClick = (type) => {
    if (type === "search") return openSearch()
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
          {navIcons.map(({id, img, type}) => {
            const isModeToggle = type === "mode"
            const title = isModeToggle
              ? `Switch to ${mode === "light" ? "dark" : "light"} mode`
              : type === "search"
                ? "Search"
                : type

            return (
              <li key={id} className={isModeToggle ? "nav-icon-item" : undefined}>
                <button
                  type="button"
                  className='icons-hover'
                  aria-label={title}
                  aria-pressed={isModeToggle ? mode === "dark" : undefined}
                  title={title}
                  onClick={() => handleIconClick(type)}
                >
                  <img
                    src={img}
                    alt=""
                    className="size-[18px]"
                    aria-hidden="true"
                  />
                </button>

                {isModeToggle && (
                  <div className="mode-theme-menu">
                    <button
                      type="button"
                      className={`mode-theme-option ${
                        mode === "light"
                          ? "mode-theme-option-active"
                          : "mode-theme-option-idle"
                      }`}
                      onClick={() => setMode("light")}
                    >
                      Light mode
                    </button>
                    <button
                      type="button"
                      className={`mode-theme-option ${
                        mode === "dark"
                          ? "mode-theme-option-active"
                          : "mode-theme-option-idle"
                      }`}
                      onClick={() => setMode("dark")}
                    >
                      Dark mode
                    </button>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
         <time>
          {time}
        </time>
      </div>
    </nav>
  )
}

export default Navbar
