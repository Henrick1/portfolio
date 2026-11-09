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
      id: "work",
      title: "Work",
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
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
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
        "A parking-spot monitor: ESP32 sensors on a physical model send data to a Flask website backed by a database.",
      tags: [
        {
          name: "Web Flask",
          color: "blue-text-gradient",
        },
        {
          name: "ESP32",
          color: "pink-text-gradient",
        },
        {
          name: "Python",
          color: "green-text-gradient",
        },
      ],
      image: iotpark,
      source_code_link: "https://github.com/Henrick1/IOT-Parking",
    },
    {
      name: "Puzzle game",
      description:
        "A Java puzzle game with a mystery story, built for a programming course using Swing interfaces.",
      tags: [
        {
          name: "Java",
          color: "blue-text-gradient",
        },
      ],
      image: javaprjct,
      source_code_link: "https://github.com/Henrick1/Java-project",
    },
    {
      name: "Computer store",
      description:
        "An online store built for a course, with a complete front-end, a products area and a PHP + SQL back-end.",
      tags: [
        {
          name: "HTML & CSS",
          color: "blue-text-gradient",
        },
        {
          name: "JavaScript",
          color: "green-text-gradient",
        },
        {
          name: "SQL & PHP",
          color: "pink-text-gradient",
        },
      ],
      image: computerstore,
      source_code_link: "https://github.com/Henrick1/Computer-Store",
    },
  ];
  
  export { services, technologies, projects };