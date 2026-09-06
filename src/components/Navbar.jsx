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

const WINDOW_NAMES = {
  finder: "Finder",
  terminal: "Terminal",
  contact: "Contact",
  resume: "Resume",
  safari: "Safari",
  photos: "Photos",
  txtfile: "Text File",
  imgfile: "Image Preview",
  settings: "Settings",
}

const getWindowDisplayName = (key, win) => {
  if (win?.data?.name) return win.data.name
  return WINDOW_NAMES[key] || key.charAt(0).toUpperCase() + key.slice(1)
}

const Navbar = () => {
  const { windows, openWindow, closeWindow, focusWindow, minimizeWindow, maximizeWindow } = useWindowStore()
  const { resetActiveLocation, navigateTo, goBack, goForward } = useLocationStore()
  const { open: openSearch, toggle: toggleSearch } = useSearchStore()
  const { mode, toggleMode } = useThemeStore()
  const [time, setTime] = useState(dayjs().format("ddd MMM D h:mm A"))

  const [activeMenu, setActiveMenu] = useState(null)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [toast, setToast] = useState(null)
  const [isWindowListOpen, setIsWindowListOpen] = useState(false)
  const [activeHelpModal, setActiveHelpModal] = useState(null)
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

  const handleMinimize = useCallback(() => {
    const activeEntry = Object.entries(windows)
      .filter(([, win]) => win.isOpen && !win.isMinimized)
      .sort((a, b) => b[1].zIndex - a[1].zIndex)[0]

    if (activeEntry) {
      minimizeWindow(activeEntry[0])
    }
  }, [windows, minimizeWindow])

  const handleZoom = useCallback(() => {
    const activeEntry = Object.entries(windows)
      .filter(([, win]) => win.isOpen && !win.isMinimized)
      .sort((a, b) => b[1].zIndex - a[1].zIndex)[0]

    if (activeEntry) {
      maximizeWindow(activeEntry[0])
    }
  }, [windows, maximizeWindow])

  const handleBringAllToFront = useCallback(() => {
    Object.entries(windows).forEach(([key, win]) => {
      if (win.isOpen) {
        focusWindow(key)
      }
    })
  }, [windows, focusWindow])

  const handleShowWindowList = useCallback(() => {
    setIsWindowListOpen(true)
  }, [])

  const handlePortfolioGuide = useCallback(() => {
    setActiveHelpModal("guide")
  }, [])

  const handleKeyboardShortcuts = useCallback(() => {
    setActiveHelpModal("shortcuts")
  }, [])

  const handleAboutThisPortfolio = useCallback(() => {
    setActiveHelpModal("about")
  }, [])

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
    about: handleAboutThisPortfolio,
    goProjects: handleGoProjects,
    projects: handleGoProjects,
    goSkills: handleGoSkills,
    skills: handleGoSkills,
    goContact: handleGoContact,
    contact: handleGoContact,
    contactMe: handleGoContact,
    goTrash: handleGoTrash,
    trash: handleGoTrash,
    goBack: handleBack,
    back: handleBack,
    goForward: handleForward,
    forward: handleForward,
    minimize: handleMinimize,
    zoom: handleZoom,
    close: handleCloseWindow,
    bringAllToFront: handleBringAllToFront,
    bringAll: handleBringAllToFront,
    showWindowList: handleShowWindowList,
    windowList: handleShowWindowList,
    portfolioGuide: handlePortfolioGuide,
    guide: handlePortfolioGuide,
    keyboardShortcuts: handleKeyboardShortcuts,
    shortcuts: handleKeyboardShortcuts,
    viewSourceCode: handleViewSource,
    aboutThisPortfolio: handleAboutThisPortfolio,
    aboutPortfolio: handleAboutThisPortfolio,
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
    handleMinimize,
    handleZoom,
    handleBringAllToFront,
    handleShowWindowList,
    handlePortfolioGuide,
    handleKeyboardShortcuts,
    handleAboutThisPortfolio,
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

  const getMenuItems = useCallback((menu) => {
    if (!menu) return []
    if (menu.id !== "window") return menu.items

    const openWindows = Object.entries(windows)
      .filter(([, win]) => win.isOpen)
      .sort((a, b) => b[1].zIndex - a[1].zIndex)

    if (openWindows.length === 0) return menu.items

    return [
      ...menu.items,
      { type: "separator" },
      ...openWindows.map(([key, win], i) => {
        const isTop = i === 0 && !win.isMinimized
        const name = getWindowDisplayName(key, win)
        return {
          id: `window-item-${key}`,
          label: isTop ? `✓ ${name}` : `   ${name}`,
          action: `focus_${key}`,
          windowKey: key,
          hint: win.isMinimized ? "(minimized)" : "",
        }
      }),
    ]
  }, [windows])

  const handleItemClick = useCallback((item) => {
    if (!item || item.disabled || (!item.action && !item.windowKey)) return
    if (item.windowKey) {
      focusWindow(item.windowKey)
      setActiveMenu(null)
      setFocusedIndex(-1)
      return
    }
    const actionFn = menuActions[item.action]
    if (typeof actionFn === "function") {
      actionFn()
      setActiveMenu(null)
      setFocusedIndex(-1)
    }
  }, [menuActions, focusWindow])

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

    const rawMenu = navMenus.find((m) => m.id === activeMenu)
    if (!rawMenu) return
    const currentItems = getMenuItems(rawMenu)

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

      const enabledIndices = currentItems
        .map((item, idx) =>
          item.type !== "separator" && !item.disabled && (item.action || item.windowKey) ? idx : null
        )
        .filter((idx) => idx !== null)

      const navigableIndices =
        enabledIndices.length > 0
          ? enabledIndices
          : currentItems
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
          const item = currentItems[focusedIndex]
          if (item && !item.disabled && (item.action || item.windowKey)) {
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
  }, [activeMenu, focusedIndex, handleItemClick, getMenuItems])

  useEffect(() => {
    if (!isWindowListOpen && !activeHelpModal) return
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsWindowListOpen(false)
        setActiveHelpModal(null)
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isWindowListOpen, activeHelpModal])

  // Global keyboard shortcuts
  useEffect(() => {
    const handleGlobalShortcuts = (e) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey
      if (!isCmdOrCtrl) return

      const key = e.key?.toLowerCase()
      if (!key) return

      const target = e.target
      const isEditable =
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)

      // Cmd/Ctrl + Shift + W: Close all windows
      if (e.shiftKey && !e.altKey && key === "w") {
        if (isEditable) return
        e.preventDefault()
        handleCloseAllWindows()
        return
      }

      // Cmd/Ctrl + Shift + F: Toggle full screen
      if (e.shiftKey && !e.altKey && key === "f") {
        if (isEditable) return
        e.preventDefault()
        handleToggleFullScreen()
        return
      }

      // Cmd/Ctrl + K: Search
      if (!e.shiftKey && !e.altKey && key === "k") {
        if (isEditable && !target.closest("#search-overlay")) return
        e.preventDefault()
        toggleSearch()
        return
      }

      // Cmd/Ctrl + W: Close active window
      if (!e.shiftKey && !e.altKey && key === "w") {
        if (isEditable) return
        e.preventDefault()
        handleCloseWindow()
        return
      }

      // Cmd/Ctrl + M: Minimize active window
      if (!e.shiftKey && !e.altKey && key === "m") {
        if (isEditable) return
        e.preventDefault()
        handleMinimize()
        return
      }
    }

    document.addEventListener("keydown", handleGlobalShortcuts)
    return () => {
      document.removeEventListener("keydown", handleGlobalShortcuts)
    }
  }, [
    handleCloseAllWindows,
    handleToggleFullScreen,
    toggleSearch,
    handleCloseWindow,
    handleMinimize,
  ])

  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className='font-bold'>Juned's Portfolio</p>

        <ul ref={navContainerRef} className="menu-bar-list" role="menubar">
          {navMenus.map((menu) => {
            const isOpen = activeMenu === menu.id
            const menuItems = getMenuItems(menu)

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
                  {menuItems.map((item, idx) => {
                    if (item.type === "separator") {
                      return (
                        <div
                          key={`sep-${idx}`}
                          role="separator"
                          className="menu-dropdown-divider"
                        />
                      )
                    }

                    const isDisabled = Boolean(item.disabled || (!item.action && !item.windowKey))
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

      {isWindowListOpen && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setIsWindowListOpen(false)}
          role="dialog"
          aria-label="Window List"
        >
          <div
            className="w-80 rounded-xl bg-white/95 dark:bg-gray-800/95 shadow-2xl border border-gray-200 dark:border-gray-700 p-4 text-gray-800 dark:text-gray-100 animate-in fade-in duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold">Currently Open Windows</h3>
              <button
                type="button"
                className="text-xs px-2 py-1 rounded hover:bg-gray-200 dark:bg-gray-700 transition"
                onClick={() => setIsWindowListOpen(false)}
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>
            <div className="mt-3 space-y-1 max-h-60 overflow-y-auto">
              {Object.entries(windows).filter(([, win]) => win.isOpen).length === 0 ? (
                <p className="text-xs text-gray-400 py-3 text-center">No open windows</p>
              ) : (
                Object.entries(windows)
                  .filter(([, win]) => win.isOpen)
                  .sort((a, b) => b[1].zIndex - a[1].zIndex)
                  .map(([key, win]) => (
                    <button
                      key={key}
                      type="button"
                      className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg hover:bg-blue-500 hover:text-white transition text-left group"
                      onClick={() => {
                        focusWindow(key)
                        setIsWindowListOpen(false)
                      }}
                    >
                      <span className="font-medium">{getWindowDisplayName(key, win)}</span>
                      <span className="text-[10px] text-gray-400 group-hover:text-white/80">
                        {win.isMinimized ? "Minimized" : "Active"}
                      </span>
                    </button>
                  ))
              )}
            </div>
          </div>
        </div>
      )}
      {activeHelpModal === "about" && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setActiveHelpModal(null)}
          role="dialog"
          aria-label="About This Portfolio"
        >
          <div
            className="w-96 rounded-2xl bg-white/95 dark:bg-neutral-900/95 shadow-2xl border border-gray-200 dark:border-white/10 p-6 text-gray-800 dark:text-gray-100 animate-in fade-in zoom-in-95 duration-150 relative text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute top-3.5 right-3.5 size-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition"
              onClick={() => setActiveHelpModal(null)}
              aria-label="Close dialog"
            >
              ✕
            </button>

            <img
              src="/images/logo.svg"
              alt="macOS Portfolio"
              className="w-16 h-16 mx-auto mb-3 drop-shadow-md"
            />
            <h3 className="text-base font-bold tracking-tight">
              {PROFILE.name}&rsquo;s Portfolio
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              macOS Web Experience &bull; Version 1.0.0
            </p>

            <div className="mt-4 p-3.5 rounded-xl bg-gray-50 dark:bg-neutral-800/60 border border-gray-200/60 dark:border-neutral-700/60 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Developer</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{PROFILE.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Role</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{PROFILE.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Core Stack</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">React 19 &bull; Vite</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Styling</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">Tailwind CSS v4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Animation</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">GSAP &bull; Draggable</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">State</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">Zustand &bull; Immer</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              <button
                type="button"
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white transition shadow-sm"
                onClick={handleViewSource}
              >
                View Source on GitHub
              </button>
              <button
                type="button"
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 text-gray-700 dark:text-gray-200 transition"
                onClick={() => {
                  setActiveHelpModal(null)
                  openWindow("settings")
                }}
              >
                Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {activeHelpModal === "shortcuts" && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setActiveHelpModal(null)}
          role="dialog"
          aria-label="Keyboard Shortcuts"
        >
          <div
            className="w-[440px] max-h-[85vh] flex flex-col rounded-2xl bg-white/95 dark:bg-neutral-900/95 shadow-2xl border border-gray-200 dark:border-white/10 p-5 text-gray-800 dark:text-gray-100 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="text-lg">⌨️</span>
                <h3 className="text-sm font-semibold">Keyboard Shortcuts</h3>
              </div>
              <button
                type="button"
                className="size-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition text-xs"
                onClick={() => setActiveHelpModal(null)}
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <div className="mt-3 space-y-2 overflow-y-auto pr-1 text-xs">
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: "⌘K", desc: "Search Portfolio" },
                  { key: "⌘N", desc: "New Finder Window" },
                  { key: "⌘W", desc: "Close Active Window" },
                  { key: "⌥⌘W", desc: "Close All Windows" },
                  { key: "⌘M", desc: "Minimize Window" },
                  { key: "⌥⌘M", desc: "Minimize All Windows" },
                  { key: "⌥⌘H", desc: "Show All Windows" },
                  { key: "⌃⌘F", desc: "Toggle Full Screen" },
                  { key: "⌘R", desc: "Refresh Desktop" },
                  { key: "⌘[ / ⌘]", desc: "Back / Forward" },
                  { key: "⇧⌘D", desc: "Desktop" },
                  { key: "⇧⌘A", desc: "About Me" },
                  { key: "⇧⌘P", desc: "Projects" },
                  { key: "⇧⌘S", desc: "Skills (Terminal)" },
                  { key: "⇧⌘C", desc: "Contact Window" },
                  { key: "⇧⌘T", desc: "Trash" },
                  { key: "⌘Q", desc: "Quit Portfolio" },
                  { key: "Esc", desc: "Close Menus / Dialogs" },
                ].map(({ key, desc }) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-neutral-800/50 border border-gray-200/50 dark:border-neutral-700/50"
                  >
                    <span className="text-gray-600 dark:text-gray-300 truncate mr-2">{desc}</span>
                    <kbd className="px-1.5 py-0.5 font-mono text-[10px] font-semibold rounded bg-white dark:bg-neutral-700 border border-gray-300 dark:border-neutral-600 text-gray-700 dark:text-gray-200 shadow-xs shrink-0">
                      {key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeHelpModal === "guide" && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setActiveHelpModal(null)}
          role="dialog"
          aria-label="Portfolio Guide"
        >
          <div
            className="w-[460px] max-h-[85vh] flex flex-col rounded-2xl bg-white/95 dark:bg-neutral-900/95 shadow-2xl border border-gray-200 dark:border-white/10 p-5 text-gray-800 dark:text-gray-100 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="text-lg">🧭</span>
                <div>
                  <h3 className="text-sm font-semibold">Portfolio Guide</h3>
                  <p className="text-[11px] text-gray-400">How to navigate and explore</p>
                </div>
              </div>
              <button
                type="button"
                className="size-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition text-xs"
                onClick={() => setActiveHelpModal(null)}
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <div className="mt-3 space-y-3 overflow-y-auto pr-1 text-xs">
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-neutral-800/50 border border-gray-200/60 dark:border-neutral-700/60 flex items-start gap-3">
                <span className="text-xl">🖥️</span>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">Desktop & Drag</h4>
                  <p className="text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                    Interactive desktop with draggable project folders. Click any folder to inspect project details in Finder.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-neutral-800/50 border border-gray-200/60 dark:border-neutral-700/60 flex items-start gap-3">
                <span className="text-xl">🚀</span>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">The Dock</h4>
                  <p className="text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                    Hover for magnification physics. Click icons to open Finder, Terminal (Skills), Resume, Contact, Safari, Photos, and Settings.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-neutral-800/50 border border-gray-200/60 dark:border-neutral-700/60 flex items-start gap-3">
                <span className="text-xl">🍎</span>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">Menu Bar</h4>
                  <p className="text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                    Fully functional File, Edit, View, Go, Window, and Help menus with keyboard shortcuts and clipboard integration.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-neutral-800/50 border border-gray-200/60 dark:border-neutral-700/60 flex items-start gap-3">
                <span className="text-xl">🔍</span>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">Instant Search</h4>
                  <p className="text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                    Press <kbd className="px-1 py-0.5 text-[10px] bg-white dark:bg-neutral-700 rounded border">⌘K</kbd> anywhere to search across projects, skills, and documents.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-neutral-800 flex justify-end gap-2">
              <button
                type="button"
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white transition shadow-sm"
                onClick={() => {
                  setActiveHelpModal(null)
                  handleGoProjects()
                }}
              >
                Open Projects
              </button>
              <button
                type="button"
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 text-gray-700 dark:text-gray-200 transition"
                onClick={() => {
                  setActiveHelpModal(null)
                  openWindow("resume")
                }}
              >
                View Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar