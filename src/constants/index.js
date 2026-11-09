import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    python,
    html,
    css,
    c,
    sql,
    java,
    git,
    micropython,
    iotpark,
    javaprjct,
    computerstore,
    threejs,
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "tools",
      title: "Tools",
    },
    {
      id: "work",
      title: "Projects",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Python Developer",
      icon: mobile,
    },
    {
      title: "Web Developer",
      icon: web,
    },
    {
      title: "Backend Developer",
      icon: backend,
    },
    {
      title: "Computer Technician",
      icon: creator,
    },
  ];
  
  const technologies = [    
    {
      name: "Python",
      icon: python,
    },
    {
      name: "HTML5",
      icon: html,
    },
    {
      name: "CSS3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    
    {
      name: "SQL",
      icon: sql,
    },
    {
      name: "Java",
      icon: java,
    },
    {
      name: "MicroPython",
      icon: micropython,
    },
    {
      name: "C",
      icon: c,
    },
    {
      name: "Three.js",
      icon: threejs,
    },
    {
      name: "Git",
      icon: git,
    },
    
  ];
  
  const projects = [
    {
      name: "IoT parking",
      description:
        "A parking-spot monitor: ESP32 sensors on a physical model report to a Flask site backed by a database.",
      tags: [
        {
          name: "Flask",
          color: "tag-copper",
        },
        {
          name: "ESP32",
          color: "tag-muted",
        },
        {
          name: "Python",
          color: "tag-led",
        },
      ],
      image: iotpark,
      source_code_link: "https://github.com/Henrick1/IOT-Parking",
    },
    {
      name: "Puzzle game",
      description:
        "A puzzle game with a mystery story, built in Java with Swing interfaces for a programming course.",
      tags: [
        {
          name: "Java",
          color: "tag-copper",
        },
      ],
      image: javaprjct,
      source_code_link: "https://github.com/Henrick1/Java-project",
    },
    {
      name: "Computer store",
      description:
        "An online store built for a course, with a working product catalogue and a PHP + SQL back-end.",
      tags: [
        {
          name: "HTML & CSS",
          color: "tag-copper",
        },
        {
          name: "JavaScript",
          color: "tag-led",
        },
        {
          name: "SQL & PHP",
          color: "tag-muted",
        },
      ],
      image: computerstore,
      source_code_link: "https://github.com/Henrick1/Computer-Store",
    },
  ];
  
  export { services, technologies, projects };