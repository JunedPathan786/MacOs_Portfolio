import useWindowStore from "#store/window.js";
import { useGSAP } from "@gsap/react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

const windowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, isMinimized, isMaximized, zIndex } = windows[windowKey]
    const ref = useRef(null)
    const draggableRef = useRef(null)

    // Open animation (fires when the window is opened)
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      el.style.display = "block";

      gsap.fromTo(el, {
        scale: 0.8,
        opacity: 0,
        y: 40
      }, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: "power3.out"
      })
    }, [isOpen])

    // Minimize / restore animation - only runs when isMinimized actually
    // changes while the window is open, so it never fights the open effect above.
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      if (isMinimized) {
        gsap.to(el, {
          scale: 0.35,
          opacity: 0,
          y: window.innerHeight * 0.55,
          x: -window.innerWidth * 0.2,
          duration: 0.35,
          ease: "power2.in",
          onComplete: () => {
            el.style.display = "none";
          }
        });
      } else {
        el.style.display = "block";
        gsap.fromTo(el, {
          scale: 0.35,
          opacity: 0,
          y: window.innerHeight * 0.55,
          x: -window.innerWidth * 0.2,
        }, {
          scale: 1,
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.35,
          ease: "power3.out"
        });
      }
    }, [isMinimized])

    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      const [instance] = Draggable.create(el, { onPress: () => focusWindow(windowKey) });
      draggableRef.current = instance;

      return () => instance.kill()
    }, [])

    // Maximize / restore: toggle a CSS class that overrides position/size, and
    // briefly enable a transition so the resize animates smoothly.
    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;

      el.classList.add("window-maximize-transition");
      const timeout = setTimeout(() => {
        el.classList.remove("window-maximize-transition");
      }, 320);

      return () => clearTimeout(timeout);
    }, [isMaximized])

    // Dragging a maximized window doesn't make sense - lock it while maximized.
    useLayoutEffect(() => {
      const instance = draggableRef.current;
      if (!instance) return;

      if (isMaximized) instance.disable();
      else instance.enable();
    }, [isMaximized])

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;

      el.style.display = isOpen ? "block" : "none";
    }, [isOpen])

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        className={`absolute${isMaximized ? " window-maximized" : ""}`}
      >
        <Component {...props} />
      </section>
    )
  }

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || 'Component'})`

  return Wrapped;

}

export default windowWrapper