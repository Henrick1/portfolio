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
    tesla,
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
      name: "Sql",
      icon: sql,
    },
    {
      name: "Java",
      icon: java,
    },
    {
      name: "Micro Python",
      icon: micropython,
    },
    {
      name: "C",
      icon: c,
    },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "git",
      icon: git,
    },
    
  ];
  
  const experiences = [
    {
      title: "Test title",
      company_name: "Testla",
      icon: tesla,
      iconBg: "#E6DEDD",
      date: " Test date Jan 2021 - Feb 2022",
      points: [
        "test1",
        "test2",
        "test3",
        "test4",
      ],
    },
  ];
  
  const testimonials = [
    {
      testimonial:
        "testim",
      name: "Sara Lee",
      designation: "CFO",
      company: "company",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
  ];
  
  const projects = [
    {
      name: "IoT parking",
      description:
        "Project of parking slots and a complete site using flask with IoT sensors and db connection made both physically and virtually.",
      tags: [
        {
          name: "Web Flask",
          color: "blue-text-gradient",
        },
        {
          name: "Esp32",
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
        "A java based puzzle solving game project with a mystery history for a programming discipline that uses basic java and interactible interfaces with swing.",
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
        "A web site made for a discipline that has complete front-end interacting with back-end with a whole functional pages and products area.",
      tags: [
        {
          name: "HTML & Css",
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
  
  export { services, technologies, experiences, testimonials, projects };