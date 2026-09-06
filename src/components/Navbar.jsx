import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import dayjs from 'dayjs'
import gsap from 'gsap'

import { navMenus, navIcons, PROFILE, socials, locations } from '#constants'
import useWindowStore from '#store/window'
import useSearchStore from '#store/search'
import useThemeStore from '#store/theme'
import useLocationStore from '#store/location'


const PORTFOLIO_REPO = "https://github.com/JunedPathan786/MacOs_Portfolio"
const GITHUB_URL = socials.find((s) => s.text.toLowerCase().includes("github"))?.link || "https://github.com/JunedPathan786"
const LINKEDIN_URL = socials.find((s) => s.text.toLowerCase().includes("linkedin"))?.link || "https://www.linkedin.com/in/junedpathan/"
const CONTACT_EMAIL = PROFILE.email || "junedp068@gmail.com"
const CONTACT_PHONE = PROFILE.phone || "+91 8830026164"

const Navbar = () => {
  const { windows, openWindow, closeWindow, focusWindow, minimizeWindow } = useWindowStore()
  const { resetActiveLocation, navigateTo, goBack, goForward } = useLocationStore()
  const { open: openSearch } = useSearchStore()
  const { mode, toggleMode } = useThemeStore()
  const [time, setTime] = useState(dayjs().format("ddd MMM D h:mm A"))

  const [activeMenu, setActiveMenu] = useState(null)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [toast, setToast] = useState(null)
  const navContainerRef = useRef(null)
  const toastTimerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    }
  }, [])

  const showToast = useCallback((message, type = "success") => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    setToast({ message, type })
    toastTimerRef.current = setTimeout(() => {
      setToast(null)
    }, 2500)
  }, [])

  const copyToClipboard = useCallback((text, label) => {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          showToast(`Copied ${label} to clipboard!`, "success")
        })
        .catch(() => {
          showToast(`Failed to copy ${label}`, "error")
        })
    } else {
      showToast(`Clipboard not supported`, "error")
    }
  }, [showToast])

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(dayjs().format("ddd MMM D h:mm A"))
    }, 30000)

    return () => clearInterval(timer)
  }, [])

  const handleIconClick = (type) => {
    if (type === "search") return openSearch()
  }

  const handleNewWindow = useCallback(() => {
    openWindow("finder")
  }, [openWindow])

  const handleCloseWindow = useCallback(() => {
    const activeEntry = Object.entries(windows)
      .filter(([, win]) => win.isOpen && !win.isMinimized)
      .sort((a, b) => b[1].zIndex - a[1].zIndex)[0]

    if (activeEntry) {
      closeWindow(activeEntry[0])
    }
  }, [windows, closeWindow])

  const handleCloseAllWindows = useCallback(() => {
    Object.entries(windows).forEach(([key, win]) => {
      if (win.isOpen) {
        closeWindow(key)
      }
    })
  }, [windows, closeWindow])

  const handleDownloadResume = useCallback(() => {
    const link = document.createElement("a")
    link.href = "/files/resume.pdf"
    link.download = "Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [])

  const handleQuitPortfolio = useCallback(() => {
    if (typeof window !== "undefined") {
      const confirmed = window.confirm("Are you sure you want to quit the portfolio?")
      if (confirmed) {
        Object.entries(windows).forEach(([key, win]) => {
          if (win.isOpen) {
            closeWindow(key)
          }
        })
      }
    }
  }, [windows, closeWindow])

  const handleMinimizeAll = useCallback(() => {
    Object.entries(windows).forEach(([key, win]) => {
      if (win.isOpen && !win.isMinimized) minimizeWindow(key)
    })
  }, [windows, minimizeWindow])

  const handleShowAllWindows = useCallback(() => {
    let hasRestored = false
    Object.entries(windows).forEach(([key, win]) => {
      if (win.isOpen && win.isMinimized) {
        focusWindow(key)
        hasRestored = true
      }
    })
    if (!hasRestored) {
      const anyOpen = Object.values(windows).some((w) => w.isOpen)
      if (!anyOpen) {
        openWindow("finder")
      }
    }
  }, [windows, focusWindow, openWindow])

  const handleToggleFullScreen = useCallback(() => {
    if (typeof document === "undefined") return
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {})
    } else {
      document.exitFullscreen?.().catch(() => {})
    }
  }, [])

  const handleRefreshDesktop = useCallback(() => {
    if (typeof window !== "undefined") {
      gsap.to(".folder", {
        x: 0,
        y: 0,
        duration: 0.25,
        ease: "power2.out",
        clearProps: "transform",
      })
      resetActiveLocation()
      setTime(dayjs().format("ddd MMM D h:mm A"))
      showToast("Desktop refreshed", "success")
    }
  }, [resetActiveLocation, showToast])

  const handleCopyEmail = useCallback(() => {
    copyToClipboard(CONTACT_EMAIL, "Email")
  }, [copyToClipboard])

  const handleCopyPhone = useCallback(() => {
    copyToClipboard(CONTACT_PHONE, "Phone")
  }, [copyToClipboard])

  const handleCopyLinkedIn = useCallback(() => {
    copyToClipboard(LINKEDIN_URL, "LinkedIn URL")
  }, [copyToClipboard])

  const handleCopyGitHub = useCallback(() => {
    copyToClipboard(GITHUB_URL, "GitHub URL")
  }, [copyToClipboard])

  const handleSearchPortfolio = useCallback(() => {
    openSearch()
  }, [openSearch])

  const handleViewSource = useCallback(() => {
    window.open(PORTFOLIO_REPO, "_blank", "noopener,noreferrer")
  }, [])

  const handleGoDesktop = useCallback(() => {
    Object.entries(windows).forEach(([key, win]) => {
      if (win.isOpen && !win.isMinimized) {
        minimizeWindow(key)
      }
    })
    resetActiveLocation()
    if (typeof document !== "undefined") {
      const desktopEl = document.getElementById("home")
      desktopEl?.focus?.()
    }
  }, [windows, minimizeWindow, resetActiveLocation])

  const handleGoAbout = useCallback(() => {
    if (locations?.about) {
      navigateTo(locations.about)
    }
    if (windows.finder?.isOpen) {
      focusWindow("finder")
    } else {
      openWindow("finder")
    }
  }, [navigateTo, windows.finder?.isOpen, focusWindow, openWindow])

  const handleGoProjects = useCallback(() => {
    if (locations?.work) {
      navigateTo(locations.work)
    }
    if (windows.finder?.isOpen) {
      focusWindow("finder")
    } else {
      openWindow("finder")
    }
  }, [navigateTo, windows.finder?.isOpen, focusWindow, openWindow])

  const handleGoSkills = useCallback(() => {
    if (windows.terminal?.isOpen) {
      focusWindow("terminal")
    } else {
      openWindow("terminal")
    }
  }, [windows.terminal?.isOpen, focusWindow, openWindow])

  const handleGoContact = useCallback(() => {
    if (windows.contact?.isOpen) {
      focusWindow("contact")
    } else {
      openWindow("contact")
    }
  }, [windows.contact?.isOpen, focusWindow, openWindow])

  const handleGoTrash = useCallback(() => {
    if (locations?.trash) {
      navigateTo(locations.trash)
    }
    if (windows.finder?.isOpen) {
      focusWindow("finder")
    } else {
      openWindow("finder")
    }
  }, [navigateTo, windows.finder?.isOpen, focusWindow, openWindow])

  const handleBack = useCallback(() => {
    goBack()
    if (windows.finder?.isOpen) {
      focusWindow("finder")
    } else {
      openWindow("finder")
    }
  }, [goBack, windows.finder?.isOpen, focusWindow, openWindow])

  const handleForward = useCallback(() => {
    goForward()
    if (windows.finder?.isOpen) {
      focusWindow("finder")
    } else {
      openWindow("finder")
    }
  }, [goForward, windows.finder?.isOpen, focusWindow, openWindow])

  // Maps each menu item's declarative "action" (defined in constants) to
  // its actual behavior, so the menu-bar layout stays pure data.
  const menuActions = useMemo(() => ({
    newWindow: handleNewWindow,
    closeWindow: handleCloseWindow,
    closeAllWindows: handleCloseAllWindows,
    downloadResume: handleDownloadResume,
    quitPortfolio: handleQuitPortfolio,
    searchPortfolio: handleSearchPortfolio,
    find: handleSearchPortfolio,
    copyEmail: handleCopyEmail,
    copyPhone: handleCopyPhone,
    copyLinkedIn: handleCopyLinkedIn,
    copyGitHub: handleCopyGitHub,
    toggleTheme: toggleMode,
    minimizeAll: handleMinimizeAll,
    showAllWindows: handleShowAllWindows,
    enterFullScreen: handleToggleFullScreen,
    toggleFullScreen: handleToggleFullScreen,
    refreshDesktop: handleRefreshDesktop,
    openSettings: () => openWindow("settings"),
    viewSource: handleViewSource,
    goDesktop: handleGoDesktop,
    desktop: handleGoDesktop,
    goAbout: handleGoAbout,
    about: handleGoAbout,
    goProjects: handleGoProjects,
    projects: handleGoProjects,
    goSkills: handleGoSkills,
    skills: handleGoSkills,
    goContact: handleGoContact,
    contact: handleGoContact,
    goTrash: handleGoTrash,
    trash: handleGoTrash,
    goBack: handleBack,
    back: handleBack,
    goForward: handleForward,
    forward: handleForward,
  }), [
    handleNewWindow,
    handleCloseWindow,
    handleCloseAllWindows,
    handleDownloadResume,
    handleQuitPortfolio,
    handleSearchPortfolio,
    handleCopyEmail,
    handleCopyPhone,
    handleCopyLinkedIn,
    handleCopyGitHub,
    toggleMode,
    handleMinimizeAll,
    handleShowAllWindows,
    handleToggleFullScreen,
    handleRefreshDesktop,
    openWindow,
    handleViewSource,
    handleGoDesktop,
    handleGoAbout,
    handleGoProjects,
    handleGoSkills,
    handleGoContact,
    handleGoTrash,
    handleBack,
    handleForward,
  ])

  const handleMenuClick = (menuId) => {
    if (activeMenu === menuId) {
      setActiveMenu(null)
      setFocusedIndex(-1)
    } else {
      setActiveMenu(menuId)
      setFocusedIndex(-1)
    }
  }

  const handleMenuMouseEnter = (menuId) => {
    if (activeMenu !== null && activeMenu !== menuId) {
      setActiveMenu(menuId)
      setFocusedIndex(-1)
    }
  }

  const handleItemClick = useCallback((item) => {
    if (!item || item.disabled || !item.action) return
    const actionFn = menuActions[item.action]
    if (typeof actionFn === "function") {
      actionFn()
      setActiveMenu(null)
      setFocusedIndex(-1)
    }
  }, [menuActions])

  // Close when clicking outside of the menu container
  useEffect(() => {
    if (!activeMenu) return

    const handleClickOutside = (e) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target)) {
        setActiveMenu(null)
        setFocusedIndex(-1)
      }
    }

    document.addEventListener("pointerdown", handleClickOutside)
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside)
    }
  }, [activeMenu])

  // Keyboard navigation for active dropdown
  useEffect(() => {
    if (!activeMenu) return

    const currentMenu = navMenus.find((m) => m.id === activeMenu)
    if (!currentMenu) return

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault()
        const closedId = activeMenu
        setActiveMenu(null)
        setFocusedIndex(-1)
        document.getElementById(`menu-btn-${closedId}`)?.focus()
        return
      }

      if (e.key === "ArrowRight") {
        e.preventDefault()
        const currentMenuIdx = navMenus.findIndex((m) => m.id === activeMenu)
        const nextMenuIdx = (currentMenuIdx + 1) % navMenus.length
        const nextMenu = navMenus[nextMenuIdx]
        setActiveMenu(nextMenu.id)
        setFocusedIndex(-1)
        document.getElementById(`menu-btn-${nextMenu.id}`)?.focus()
        return
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault()
        const currentMenuIdx = navMenus.findIndex((m) => m.id === activeMenu)
        const prevMenuIdx = (currentMenuIdx - 1 + navMenus.length) % navMenus.length
        const prevMenu = navMenus[prevMenuIdx]
        setActiveMenu(prevMenu.id)
        setFocusedIndex(-1)
        document.getElementById(`menu-btn-${prevMenu.id}`)?.focus()
        return
      }

      const enabledIndices = currentMenu.items
        .map((item, idx) =>
          item.type !== "separator" && !item.disabled && item.action ? idx : null
        )
        .filter((idx) => idx !== null)

      const navigableIndices =
        enabledIndices.length > 0
          ? enabledIndices
          : currentMenu.items
              .map((item, idx) => (item.type !== "separator" ? idx : null))
              .filter((idx) => idx !== null)

      if (navigableIndices.length === 0) return

      if (e.key === "ArrowDown") {
        e.preventDefault()
        let nextIdx
        const currentPos = navigableIndices.indexOf(focusedIndex)
        if (currentPos === -1 || currentPos === navigableIndices.length - 1) {
          nextIdx = navigableIndices[0]
        } else {
          nextIdx = navigableIndices[currentPos + 1]
        }
        setFocusedIndex(nextIdx)
        document.getElementById(`menu-item-${activeMenu}-${nextIdx}`)?.focus()
        return
      }

      if (e.key === "ArrowUp") {
        e.preventDefault()
        let prevIdx
        const currentPos = navigableIndices.indexOf(focusedIndex)
        if (currentPos === -1 || currentPos === 0) {
          prevIdx = navigableIndices[navigableIndices.length - 1]
        } else {
          prevIdx = navigableIndices[currentPos - 1]
        }
        setFocusedIndex(prevIdx)
        document.getElementById(`menu-item-${activeMenu}-${prevIdx}`)?.focus()
        return
      }

      if (e.key === "Enter" || e.key === " ") {
        if (focusedIndex >= 0) {
          const item = currentMenu.items[focusedIndex]
          if (item && !item.disabled && item.action) {
            e.preventDefault()
            handleItemClick(item)
          }
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [activeMenu, focusedIndex, handleItemClick])

  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className='font-bold'>Juned's Portfolio</p>

        <ul ref={navContainerRef} className="menu-bar-list" role="menubar">
          {navMenus.map((menu) => {
            const isOpen = activeMenu === menu.id

            return (
              <li key={menu.id} className="nav-icon-item" role="none">
                <button
                  id={`menu-btn-${menu.id}`}
                  type="button"
                  className={`menu-nav-btn ${isOpen ? "is-active" : ""}`}
                  onClick={() => handleMenuClick(menu.id)}
                  onMouseEnter={() => handleMenuMouseEnter(menu.id)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown" && !isOpen) {
                      e.preventDefault()
                      setActiveMenu(menu.id)
                      setFocusedIndex(0)
                    }
                  }}
                  role="menuitem"
                  aria-haspopup="menu"
                  aria-expanded={isOpen}
                >
                  {menu.name}
                </button>

                <div
                  role="menu"
                  aria-label={menu.name}
                  className={`menu-dropdown ${isOpen ? "is-open" : ""}`}
                >
                  {menu.items.map((item, idx) => {
                    if (item.type === "separator") {
                      return (
                        <div
                          key={`sep-${idx}`}
                          role="separator"
                          className="menu-dropdown-divider"
                        />
                      )
                    }

                    const isDisabled = Boolean(item.disabled || !item.action)
                    const isFocused = isOpen && focusedIndex === idx

                    return (
                      <button
                        id={`menu-item-${menu.id}-${idx}`}
                        key={item.id || idx}
                        type="button"
                        role="menuitem"
                        disabled={isDisabled}
                        tabIndex={isFocused ? 0 : -1}
                        className={`menu-dropdown-option ${
                          isDisabled ? "is-disabled" : ""
                        } ${isFocused ? "is-focused" : ""}`}
                        onClick={() => handleItemClick(item)}
                        onMouseEnter={() => {
                          if (!isDisabled) setFocusedIndex(idx)
                        }}
                      >
                        <span>{item.label}</span>
                        {item.hint && (
                          <span className="menu-dropdown-hint">{item.hint}</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </li>
            )
          })}
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

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed top-11 right-5 z-[99999] flex items-center gap-2.5 rounded-xl border px-3.5 py-2 text-xs font-medium shadow-2xl backdrop-blur-2xl transition-all duration-200 pointer-events-none ${
            toast.type === "error"
              ? "border-red-500/30 bg-red-500/15 text-red-600 dark:text-red-400"
              : "border-black/10 bg-white/95 text-gray-800 dark:border-white/10 dark:bg-neutral-900/95 dark:text-white"
          }`}
        >
          <span
            className={`size-2 rounded-full ${
              toast.type === "error" ? "bg-red-500" : "bg-emerald-500"
            }`}
          />
          <span>{toast.message}</span>
        </div>
      )}
    </nav>
  )
}

export default Navbar