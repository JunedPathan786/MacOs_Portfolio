import windowWrapper from "#hoc/windowWrapper.jsx"
import { techStack } from "#constants/index.js"
import { Check, Flag } from "lucide-react"
import WindowControls from "#components/WindowControls.jsx"

const Terminal = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="terminal"/>
        <h2>Tech Stack</h2>
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
            <Check size={20} /> {techStack.length} stack groups loaded successfully
          </p>
          <p className="text-gray-800 dark:text-gray-300">
            <Flag size={15} fill="currentColor" /> Available for freelance and full-time opportunities
          </p>
        </div>
      </div>
    </>
  )
}

const TerminalWindow = windowWrapper(Terminal, 'terminal')

export default TerminalWindow