import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";

const ServiceCard = ({ title, icon }) => (
  <li className="bg-tertiary border border-line rounded-xl p-6 flex items-center gap-4">
    <img src={icon} alt="" width="48" height="48" loading="lazy" className="w-12 h-12 object-contain" />
    <h3 className="text-white text-[18px] font-semibold">{title}</h3>
  </li>
);

const About = () => {
  return (
    <>
      <h2 className={styles.sectionHeadText}>About</h2>
      <p className="mt-6 text-white-100/85 text-[18px] max-w-[62ch] leading-[1.7]">
        I'm a Brazilian Computer Science student who likes building things end to end, from the sensor on
        the breadboard to the page in the browser. I work mostly with Python, JavaScript, Java, C and SQL, and
        I've used Three.js for 3D on the web. My course covers front-end and back-end development, assembly,
        discrete mathematics and cyber security, plus physical computing projects with microcontrollers.
      </p>
      <p className="mt-4 text-white-100/85 text-[18px] max-w-[62ch] leading-[1.7]">
        I speak English fluently, learn fast, and I'm looking for my first professional role.
      </p>

      <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </ul>
    </>
  );
};

export default SectionWrapper(About, "about");
