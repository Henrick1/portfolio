import { useEffect, useState } from "react";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass = (title) =>
    `${active === title ? "text-white" : "text-secondary"} hover:text-white transition-colors`;

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-4 fixed top-0 z-20 transition-colors duration-300 ${
        scrolled ? "bg-primary/90 backdrop-blur border-b border-line" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <a
          href="#"
          className="flex items-center gap-3"
          onClick={() => {
            setActive("");
            setToggle(false);
          }}
        >
          <img src={logo} alt="" width="40" height="40" className="w-10 h-10 object-contain" />
          <span className="text-white text-[18px] font-bold">Henrique</span>
        </a>

        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((nav) => (
            <li key={nav.id} className="text-[16px] font-medium">
              <a href={`#${nav.id}`} className={linkClass(nav.title)} onClick={() => setActive(nav.title)}>
                {nav.title}
              </a>
            </li>
          ))}
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <button
            type="button"
            aria-label={toggle ? "Close menu" : "Open menu"}
            aria-expanded={toggle}
            aria-controls="mobile-menu"
            onClick={() => setToggle(!toggle)}
            className="p-1"
          >
            <img src={toggle ? close : menu} alt="" className="w-[26px] h-[26px] object-contain" />
          </button>

          <div
            id="mobile-menu"
            className={`${
              toggle ? "flex" : "hidden"
            } p-6 bg-tertiary border border-line absolute top-16 right-0 mx-4 my-2 min-w-[160px] z-10 rounded-xl shadow-card`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li key={nav.id} className="font-medium text-[16px]">
                  <a
                    href={`#${nav.id}`}
                    className={linkClass(nav.title)}
                    onClick={() => {
                      setToggle(false);
                      setActive(nav.title);
                    }}
                  >
                    {nav.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
