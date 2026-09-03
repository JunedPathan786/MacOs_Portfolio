import { useRef } from "react"
import { PROFILE } from "#constants"
import useWindowStore from "#store/window"
import { renderText, useTextHover } from "#hoc/useTextHover.jsx"

const Welcome = () => {

  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const { openWindow } = useWindowStore()

  useTextHover(subtitleRef, "subtitle");
  useTextHover(titleRef, "title");

  return (
    <section id="welcome">
      <p ref={subtitleRef} className="welcome-kicker">
        {renderText(
          `Hey, I'm ${PROFILE.name.split(" ")[0]}.`,
          'text-xl font-georama',
          100)}
      </p>
      <h1 ref={titleRef} className="mt-5">
        {renderText(PROFILE.role, "text-6xl font-georama")}
      </h1>

      <p className="welcome-summary">
        Building scalable web applications and AI-powered products.
      </p>

      <div className="welcome-actions">
        <button type="button" onClick={() => openWindow("finder")}>
          View Projects
        </button>
        <button type="button" onClick={() => openWindow("resume")}>
          Resume
        </button>
      </div>
    </section>
  )
}

export default Welcome