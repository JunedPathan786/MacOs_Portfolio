import { useEffect, useState } from 'react'

import dayjs from 'dayjs'

import { navMenus, navIcons } from '#constants'
import useWindowStore from '#store/window'
import useSearchStore from '#store/search'
import useThemeStore from '#store/theme'


const PORTFOLIO_REPO = "https://github.com/JunedPathan786/MacOs_Portfolio"
const CONTACT_EMAIL = "junedp068@gmail.com"

const Navbar = () => {
  const { windows, openWindow, minimizeWindow } = useWindowStore()
  const { open: openSearch } = useSearchStore()
  const { mode, toggleMode } = useThemeStore()
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

  const handleMinimizeAll = () => {
    Object.entries(windows).forEach(([key, win]) => {
      if (win.isOpen && !win.isMinimized) minimizeWindow(key)
    })
  }

  const handleCopyEmail = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(CONTACT_EMAIL).catch(() => {})
    }
  }

  const handleViewSource = () => {
    window.open(PORTFOLIO_REPO, "_blank", "noopener,noreferrer")
  }

  // Maps each menu item's declarative "action" (defined in constants) to
  // its actual behavior, so the menu-bar layout stays pure data.
  const menuActions = {
    toggleTheme: toggleMode,
    minimizeAll: handleMinimizeAll,
    openSettings: () => openWindow("settings"),
    viewSource: handleViewSource,
    find: () => openSearch(),
    copyEmail: handleCopyEmail,
  }

  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className='font-bold'>Juned's Portfolio</p>

        <ul>
          {navMenus.map((menu) => (
            <li key={menu.id} className="nav-icon-item">
              <p>{menu.name}</p>
              <div className="menu-dropdown">
                {menu.items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="menu-dropdown-option"
                    onClick={menuActions[item.action]}
                  >
                    <span>{item.label}</span>
                    {item.hint && (
                      <span className="menu-dropdown-hint">{item.hint}</span>
                    )}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {navIcons.map(({ id, img, type }) => {
            const isWifi = type === "wifi"
            const isBluetooth = type === "bluetooth"
            const isBattery = type === "battery"
            const isControlCenter = type === "control-center"
            const hasHoverInfo = isWifi || isBluetooth || isBattery || isControlCenter

            const title = isWifi
              ? "Wi-Fi"
              : isBluetooth
                ? "Bluetooth"
                : isBattery
                  ? "Battery"
                  : isControlCenter
                    ? "Control Center"
                    : type === "search"
                      ? "Search"
                      : type

            return (
              <li key={id} className={hasHoverInfo ? "nav-icon-item" : undefined}>
                <button
                  type="button"
                  className='icons-hover'
                  aria-label={title}
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

                {isWifi && (
                  <div className="status-menu">
                    <div className="status-menu-row">
                      <span>Wi-Fi</span>
                      <span className="status-menu-hint">Portfolio-5G</span>
                    </div>
                  </div>
                )}

                {isBluetooth && (
                  <div className="status-menu">
                    <div className="status-menu-row">
                      <span>Bluetooth</span>
                      <span className="status-menu-hint">2 Connected</span>
                    </div>
                  </div>
                )}

                {isBattery && (
                  <div className="status-menu">
                    <div className="status-menu-row">
                      <span>Battery</span>
                      <span className="status-menu-hint">92%</span>
                    </div>
                    <div className="status-menu-row">
                      <span className="status-menu-hint">Charging</span>
                    </div>
                  </div>
                )}

                {isControlCenter && (
                  <div className="status-menu control-center-panel">
                    <div className="status-menu-row">
                      <span>Wi-Fi</span>
                      <span className="status-menu-hint">Portfolio-5G</span>
                    </div>
                    <div className="status-menu-row">
                      <span>Bluetooth</span>
                      <span className="status-menu-hint">2 Connected</span>
                    </div>
                    <div className="status-menu-divider" />
                    <button
                      type="button"
                      className="status-menu-toggle-row"
                      onClick={toggleMode}
                      aria-pressed={mode === "dark"}
                    >
                      <span>Dark Mode</span>
                      <span className={`switch ${mode === "dark" ? "switch-on" : ""}`}>
                        <span
                          className={`switch-knob ${
                            mode === "dark" ? "translate-x-[14px]" : "translate-x-0"
                          }`}
                        />
                      </span>
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