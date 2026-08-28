import useWindowStore from '#store/window.js'
import { Maximize2, Minus, X } from "lucide-react"

const WindowControls = ({ target }) => {
  const { closeWindow, minimizeWindow, maximizeWindow } = useWindowStore();

  return (
    <div id="window-controls">
      <button type="button" className="close" aria-label="Close window" onClick={() => closeWindow(target)}>
        <X aria-hidden="true" />
      </button>
      <button type="button" className="minimize" aria-label="Minimize window" onClick={() => minimizeWindow(target)}>
        <Minus aria-hidden="true" />
      </button>
      <button type="button" className="maximize" aria-label="Maximize window" onClick={() => maximizeWindow(target)}>
        <Maximize2 aria-hidden="true" />
      </button>
    </div>
  )
}

export default WindowControls