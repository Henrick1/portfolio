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
      title: "Python & Flask",
      description: "Web apps with Flask, Flask-Login and SQLAlchemy",
      icon: mobile,
    },
    {
      title: "Web Development",
      description: "HTML, CSS, JavaScript and PHP sites backed by SQL",
      icon: web,
    },
    {
      title: "IoT & Embedded",
      description: "ESP32 and MicroPython sensors talking over MQTT",
      icon: backend,
    },
    {
      title: "Computer Technician",
      description: "Hardware assembly, maintenance and troubleshooting",
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
      name: "IoT Parking",
      description:
        "Smart parking system: ESP32 sensors (simulated on Wokwi) report free spots over MQTT to a Flask web app. Staff log in to manage parking spots, opening hours, sensors and actuators, with data stored in MySQL through SQLAlchemy.",
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
        "An online computer store built for my Web Development course: account sign-up and login, product catalogue, shopping cart and checkout with Pix, with a PHP and SQL back-end.",
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
  
  export { services, technologies, projects };