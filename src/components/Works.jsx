import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";

const ProjectCard = ({ name, description, tags, image, source_code_link }) => {
  return (
    <li className="bg-tertiary border border-line rounded-2xl overflow-hidden flex flex-col">
      <img
        src={image}
        alt={`Screenshot of ${name}`}
        loading="lazy"
        width="720"
        height="460"
        className="w-full aspect-[16/10] object-cover border-b border-line"
      />
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-white font-bold text-[22px]">{name}</h3>
        <p className="mt-2 text-secondary text-[15px] leading-[1.6]">{description}</p>
        <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
          {tags.map((tag) => (
            <li key={tag.name} className={`text-[14px] font-medium ${tag.color}`}>
              {tag.name}
            </li>
          ))}
        </ul>
        <a
          href={source_code_link}
          target="_blank"
          rel="noreferrer"
          className="mt-auto pt-6 inline-flex items-center gap-2 text-white font-semibold hover:text-copper transition-colors w-fit"
        >
          <img src={github} alt="" width="18" height="18" className="w-[18px] h-[18px]" />
          View source code
        </a>
      </div>
    </li>
  );
};

const Works = () => {
  return (
    <>
      <h2 className={styles.sectionHeadText}>Projects</h2>
      <p className="mt-6 text-white-100/85 text-[18px] max-w-[62ch] leading-[1.7]">
        Course and personal projects, each with its source code on GitHub.
      </p>
      <ul className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </ul>
    </>
  );
};

export default SectionWrapper(Works, "work");
