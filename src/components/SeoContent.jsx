import { PROFILE, techStack, socials, gallery, locations } from "#constants/index.js";

const aboutFile = locations.about?.children?.find((c) => c.fileType === "txt");
const projects = locations.work?.children ?? [];
const journey = gallery?.journey ?? [];

const getProjectMeta = (project) => {
  const txt = project.children?.find((c) => c.fileType === "txt");
  const repo = project.children?.find((c) => c.fileType === "url");
  const description = txt?.description ?? [];
  const techLine = description.find((line) => line.startsWith("Tech stack:"));
  const summary = description.filter((line) => line !== techLine);
  return { summary, techLine, repoHref: repo?.href };
};

/**
 * Renders no visible pixels — .seo-sr-only clips it off-screen while
 * keeping it in the DOM and accessibility tree. It gives screen readers
 * and search engine crawlers direct access to the portfolio's real
 * content (bio, skills, projects, experience, contact links) without
 * needing to open the interactive macOS-style windows. Content is
 * sourced entirely from the existing constants — nothing invented.
 * Mounted unconditionally so it's present on both the desktop and
 * mobile layouts, and it doesn't alter any existing UI, animation, or
 * functionality.
 */
const SeoContent = () => (
  <section className="seo-sr-only" aria-label={`${PROFILE.name} full portfolio summary`}>
    <h2>
      {PROFILE.name} — {PROFILE.role}
    </h2>
    <p>
      {PROFILE.summary} Based in {PROFILE.location}. {PROFILE.availability}.
    </p>

    {aboutFile?.description?.length ? (
      <>
        <h3>About</h3>
        {aboutFile.description.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </>
    ) : null}

    <h3>Skills &amp; tech stack</h3>
    <ul>
      {techStack.map(({ category, items }) => (
        <li key={category}>
          {category}: {items.join(", ")}
        </li>
      ))}
    </ul>

    <h3>Projects</h3>
    <ul>
      {projects.map((project) => {
        const { summary, techLine, repoHref } = getProjectMeta(project);
        return (
          <li key={project.id}>
            <h4>{project.name}</h4>
            {summary.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            {techLine ? <p>{techLine}</p> : null}
            {repoHref ? (
              <a href={repoHref} target="_blank" rel="noopener noreferrer">
                View {project.name} source code on GitHub
              </a>
            ) : null}
          </li>
        );
      })}
    </ul>

    {journey.length ? (
      <>
        <h3>Experience &amp; education</h3>
        <ul>
          {journey.map(({ id, period, title, place }) => (
            <li key={id}>{[period, title, place].filter(Boolean).join(" — ")}</li>
          ))}
        </ul>
      </>
    ) : null}

    <h3>Contact</h3>
    <ul>
      <li>
        <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
      </li>
      <li>
        <a href={`tel:${PROFILE.phone.replace(/\s+/g, "")}`}>{PROFILE.phone}</a>
      </li>
      {socials.map(({ id, text, link }) => (
        <li key={id}>
          <a href={link} target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        </li>
      ))}
      <li>
        <a href="/files/resume.pdf" download>
          Download {PROFILE.name}&rsquo;s resume (PDF)
        </a>
      </li>
    </ul>
  </section>
);

export default SeoContent;
