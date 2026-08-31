import windowWrapper from "#hoc/windowWrapper.jsx"
import { techStack } from "#constants/index.js"
import { Check, Flag } from "lucide-react"
import WindowControls from "#components/windowControls.jsx"

const Terminal = () => {
  return (
    <>
      <div id="window-header" className="shrink-0">
        <WindowControls target="terminal" />
        <h2 className="text-sm font-semibold text-center flex-1 text-gray-700 dark:text-gray-200">Tech Stack</h2>
        <span className="w-12 shrink-0" aria-hidden="true" />
      </div>

      <div className='techstack'>
        <p>
          <span className='font-bold'>@juned % </span>
          show tech stack
        </p>

        <div className="label">
          <p className="w-36">Category</p>
          <p>Technology</p>
        </div>

        <ul className="content flex flex-col">
          {techStack.map(({ category, items }) => (
            <li key={category} className="flex items-center">
              <Check className="check" size={20} />
              <h3>{category}</h3>
              <ul>{items.map((item, i) => (
                <li key={i}>
                  {item}
                  {i < items.length - 1 ? "," : ""}</li>
              ))}</ul>
            </li>
          ))}
        </ul>

        <div className="footnote">
          <p>
            <Check size={20} /> 5 of 5 stack loaded successfully (100%)
          </p>
          <p className="text-black">
            <Flag size={15} fill="black" /> Render time: 6ms
          </p>
        </div>
      </div>
    </>
  )
}

const TerminalWindow = windowWrapper(Terminal, 'terminal')

export default TerminalWindow