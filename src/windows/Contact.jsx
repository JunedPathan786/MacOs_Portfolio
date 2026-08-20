import { WindowControls } from "#components";
import { PROFILE, socials } from "#constants";
import WindowWrapper from "#hoc/windowWrapper"

const Contact = () => {
  return (
    <>
      <div id="window-header" className="shrink-0">
        <WindowControls target="contact"/>
        <h2>Contact Me!</h2>
      </div>
      <div className="p-5 space-y-5 flex-1 overflow-y-auto min-h-0">
        <img src={PROFILE.avatar} alt={PROFILE.name} className="w-20 rounded-full object-cover aspect-square" />
        <h3>Let's build something.</h3>
        <p>{PROFILE.summary}</p>
        <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
          <span className="size-2 rounded-full bg-emerald-500" />
          {PROFILE.availability}
        </p>
        <p><a href={`mailto:${PROFILE.email}`} className="text-indigo-600 hover:text-indigo-700 hover:font-bold transition-all duration-300 ease-in-out">
          {PROFILE.email}
        </a></p>
        <ul>
          {socials.map(({ id, bg, link, icon, text }) => (
            <li key={id} style={{ backgroundColor: bg}}>
              <a href={link} target="_blank" rel="noopener noreferrer" title={text}>
                <img src={icon} alt={text} className="size-5" />
                <p>{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

const ContactWindow = WindowWrapper(Contact, 'contact');

export default ContactWindow;
