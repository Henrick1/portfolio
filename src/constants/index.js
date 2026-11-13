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
    react,
    typescript,
    nextjs,
    tailwind,
    nodejs,
    express,
    gcp,
    firebase,
    docker,
    portfolio,
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "skills",
      title: "Skills",
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
      title: "Front-end",
      description: "React, Next.js, TypeScript and Tailwind CSS interfaces",
      icon: web,
    },
    {
      title: "Back-end & APIs",
      description: "Node.js and Express REST APIs, authentication and data modelling",
      icon: backend,
    },
    {
      title: "Cloud & DevOps",
      description: "Google Cloud, Firebase and Docker, from build to deploy",
      icon: mobile,
    },
    {
      title: "IoT & Hardware",
      description: "ESP32 and MicroPython projects, plus computer technician skills",
      icon: creator,
    },
  ];
  
  const techGroups = [
    {
      title: "Front-end",
      items: [
        { name: "React", icon: react },
        { name: "Next.js", icon: nextjs },
        { name: "TypeScript", icon: typescript },
        { name: "JavaScript", icon: javascript },
        { name: "Tailwind CSS", icon: tailwind },
        { name: "HTML5", icon: html },
        { name: "CSS3", icon: css },
        { name: "Three.js", icon: threejs },
      ],
    },
    {
      title: "Back-end",
      items: [
        { name: "Node.js", icon: nodejs },
        { name: "Express", icon: express },
        { name: "Python", icon: python },
        { name: "Java", icon: java },
        { name: "SQL", icon: sql },
      ],
    },
    {
      title: "Cloud & DevOps",
      items: [
        { name: "Google Cloud", icon: gcp },
        { name: "Firebase", icon: firebase },
        { name: "Docker", icon: docker },
        { name: "Git", icon: git },
      ],
    },
    {
      title: "IoT & low-level",
      items: [
        { name: "MicroPython", icon: micropython },
        { name: "C", icon: c },
      ],
    },
  ];

  const profile = [
    { label: "Education", value: "B.Sc. in Computer Science" },
    { label: "Location", value: "Brazil" },
    { label: "Languages", value: "Portuguese (native), English (fluent)" },
    { label: "Focus", value: "Full stack: React, Next.js, Node.js and Google Cloud" },
    { label: "Status", value: "Open to full stack opportunities" },
  ];
  
  const projects = [
    {
      name: "3D Developer Portfolio",
      description:
        "This website: a single-page portfolio in React with Three.js scenes rendered through React Three Fiber, styled with Tailwind CSS and built with Vite. 3D models are compressed and loaded only when scrolled into view to keep the first load light.",
      tags: [
        { name: "React", color: "blue-text-gradient" },
        { name: "Three.js", color: "green-text-gradient" },
        { name: "Tailwind CSS", color: "pink-text-gradient" },
        { name: "Vite", color: "blue-text-gradient" },
      ],
      image: portfolio,
      source_code_link: "https://github.com/Henrick1/portfolio",
    },
    {
      name: "IoT Parking",
      description:
        "Full stack parking management app: a Flask web app with staff login and an admin panel for parking spots, opening hours, sensors and actuators, backed by MySQL through SQLAlchemy. ESP32 sensors (simulated on Wokwi) report free spots in real time over MQTT.",
      tags: [
        {
          name: "Python & Flask",
          color: "blue-text-gradient",
        },
        {
          name: "ESP32 & MQTT",
          color: "pink-text-gradient",
        },
        {
          name: "MySQL",
          color: "green-text-gradient",
        },
      ],
      image: iotpark,
      source_code_link: "https://github.com/Henrick1/IOT-Parking",
    },
    {
      name: "Detective Game",
      description:
        "A Java mystery game with a Swing interface: solve riddles, restore a burned clue and interrogate prisoners to catch the culprit. Built with object-oriented design (detective and criminal class hierarchy), file reading, custom exceptions and serialization.",
      tags: [
        {
          name: "Java",
          color: "blue-text-gradient",
        },
        {
          name: "Swing",
          color: "green-text-gradient",
        },
        {
          name: "OOP",
          color: "pink-text-gradient",
        },
      ],
      image: javaprjct,
      source_code_link: "https://github.com/Henrick1/Java-project",
    },
    {
      name: "Octacore Computer Store",
      description:
        "Full stack online computer store: account sign-up and login, product catalogue, shopping cart and checkout with Pix, with a JavaScript front-end and a PHP and SQL back-end.",
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
          name: "PHP & SQL",
          color: "pink-text-gradient",
        },
      ],
      image: computerstore,
      source_code_link: "https://github.com/Henrick1/Computer-Store",
    },
  ];
  
  export { services, techGroups, profile, projects };