import useWindowStore from "#store/window.js";
import { APP_WINDOW_MAP } from "#constants/index.js";
import { useGSAP } from "@gsap/react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

const windowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, isMinimized, isMaximized, zIndex } = windows[windowKey];
    const ref = useRef(null);
    const draggableRef = useRef(null);

    const getDockDelta = () => {
      const el = ref.current;
      const dockAppId = Object.keys(APP_WINDOW_MAP).find(
        (appId) => APP_WINDOW_MAP[appId] === windowKey,
      );
      const dockIcon = dockAppId
        ? document.querySelector(`[data-window-id="${dockAppId}"]`)
        : null;

      if (!el || !dockIcon) {
        return {
          x: -window.innerWidth * 0.2,
          y: window.innerHeight * 0.55,
        };
      }

      const windowRect = el.getBoundingClientRect();
      const dockRect = dockIcon.getBoundingClientRect();

      return {
        x:
          dockRect.left +
          dockRect.width / 2 -
          (windowRect.left + windowRect.width / 2),
        y:
          dockRect.top +
          dockRect.height / 2 -
          (windowRect.top + windowRect.height / 2),
      };
    };

    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      el.style.display = "block";

      gsap.fromTo(
        el,
        {
          scale: 0.8,
          opacity: 0,
          y: 40,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: "power3.out",
        },
      );
    }, [isOpen]);

    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      if (isMinimized) {
        const delta = getDockDelta();
        gsap.to(el, {
          scale: 0.15,
          opacity: 0,
          x: delta.x,
          y: delta.y,
          duration: 0.45,
          ease: "power3.inOut",
          onComplete: () => {
            el.style.display = "none";
          },
        });
      } else {
        const delta = getDockDelta();
        el.style.display = "block";
        gsap.fromTo(
          el,
          {
            scale: 0.15,
            opacity: 0,
            x: delta.x,
            y: delta.y,
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.4,
            ease: "power3.out",
          },
        );
      }
    }, [isMinimized]);

    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      const [instance] = Draggable.create(el, {
        trigger: el.querySelector("#window-header") ?? el,
        bounds: "main",
        edgeResistance: 0.85,
        onPress: () => focusWindow(windowKey),
      });
      draggableRef.current = instance;

      return () => instance.kill();
    }, []);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;

      el.classList.add("window-maximize-transition");
      const timeout = setTimeout(() => {
        el.classList.remove("window-maximize-transition");
      }, 320);

      return () => clearTimeout(timeout);
    }, [isMaximized]);

    useLayoutEffect(() => {
      const instance = draggableRef.current;
      if (!instance) return;

      if (isMaximized) instance.disable();
      else instance.enable();
    }, [isMaximized]);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;

      el.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        className={`window absolute${isMaximized ? " window-maximized" : ""}`}
        onPointerDown={() => focusWindow(windowKey)}
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
};

export default windowWrapper;
