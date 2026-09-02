import { useRef } from "react"
import { Tooltip } from "react-tooltip";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'

import { dockApps, getAppLaunchTarget } from "#constants/index.js";
import usewindowstore from "#store/window.js";
import useLocationStore from "#store/location.js";

const Dock = () => {
  const { openWindow, closeWindow, focusWindow, windows } = usewindowstore()
  const { activeLocation, setActiveLocation } = useLocationStore()
  const dockRef = useRef(null);

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const icons = Array.from(dock.querySelectorAll(".dock-icon"))
    const iconTweens = icons.map((icon) => ({
      icon,
      scaleTo: gsap.quickTo(icon, "scale", { duration: 0.2, ease: "power1.out" }),
      yTo: gsap.quickTo(icon, "y", { duration: 0.2, ease: "power1.out" }),
    }))

    const animateIcons = (mouseX) => {
      const { left } = dock.getBoundingClientRect();

      iconTweens.forEach(({ icon, scaleTo, yTo }) => {
        const { left: iconLeft, width } = icon.getBoundingClientRect();
        const center = iconLeft - left + width / 2;
        const distance = Math.abs(mouseX - center);

        const intensity = Math.exp(-(distance ** 2.5) / 20000);

        scaleTo(1 + 0.25 * intensity);
        yTo(-15 * intensity);
      });
    };

    const handleMouseMove = (e) => {
      const { left } = dock.getBoundingClientRect();

      animateIcons(e.clientX - left);
    }

    const resetIcons = () => iconTweens.forEach(({ scaleTo, yTo }) => {
      scaleTo(1)
      yTo(0)
    })

    dock.addEventListener("mousemove", handleMouseMove)
    dock.addEventListener("mouseleave", resetIcons)

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove)
      dock.removeEventListener("mouseleave", resetIcons)
    }
  }, []);


  const toggleApp = (app) => {
    if (!app.canOpen) {
      console.error(`Window not found app: ${app.id}`)
      return
    };

    const target = getAppLaunchTarget(app.id);
    if (!target) {
      console.error(`No launch target configured for app: ${app.id}`)
      return
    }

    const { windowKey, location, history } = target;
    const win = windows[windowKey];
    if (!win) {
      console.error(`Window not found for key: ${windowKey}`)
      return
    }

    if (location) {
      setActiveLocation(location, { history: history ?? [] });
      if (win.isOpen) {
        focusWindow(windowKey);
      } else {
        openWindow(windowKey);
      }
      return;
    }

    if (win.isOpen && win.isMinimized) {
      focusWindow(windowKey);
    } else if (win.isOpen) {
      closeWindow(windowKey);
    } else {
      openWindow(windowKey)
    }
  }

  const isAppActive = (app) => {
    const target = getAppLaunchTarget(app.id);
    if (!target) return false;
    const win = windows[target.windowKey];
    if (!win?.isOpen) return false;
    if (!target.location) return true;
    return activeLocation === target.location;
  }

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <div key={id} className="relative flex justify-center">
            <button
              type="button"
              className="dock-icon"
              aria-label={name}
              data-window-id={id}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-delay-show={150}
              disabled={!canOpen}
              onClick={() => toggleApp({ id, canOpen })}
            >
              <img src={`/images/${icon}`}
                alt={name}
                loading="lazy"
                className={canOpen ? "" : "opacity-60"} />
            </button>
            {isAppActive({ id }) && (
              <span className="dock-indicator" aria-hidden="true" />
            )}
          </div>
        ))}
        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  )
}

export default Dock
