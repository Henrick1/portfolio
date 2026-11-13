import {
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
    contagotas,
    tabfolio,
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
    flask,
    electron,
    figma,
    mysql,
    postgresql,
    linux,
    claude,
  } from "../assets";
  
  export const navLinks = [
    { id: "about", title: "about" },
    { id: "skills", title: "stack" },
    { id: "work", title: "projects" },
    { id: "contact", title: "contact" },
  ];
  
  const services = [
    {
      title: "Front-end",
      description: "pixel-pushing with React, Next.js, TypeScript & Tailwind",
      shape: "gem",
    },
    {
      title: "Back-end & APIs",
      description: "Node.js + Express APIs that (usually) don't break",
      shape: "geo",
    },
    {
      title: "Cloud & DevOps",
      description: "Google Cloud, Firebase & Docker: works on my machine AND yours",
      shape: "cubes",
    },
    {
      title: "IoT & Hardware",
      description: "ESP32, MicroPython and a screwdriver",
      shape: "hexes",
    },
  ];
  
  const techGroups = [
    {
      title: "front-end",
      items: [
        { name: "React", icon: react },
        { name: "Next.js", icon: nextjs },
        { name: "TypeScript", icon: typescript },
        { name: "JavaScript", icon: javascript },
        { name: "Tailwind", icon: tailwind },
        { name: "HTML5", icon: html },
        { name: "CSS3", icon: css },
        { name: "Three.js", icon: threejs },
      ],
    },
    {
      title: "back-end",
      items: [
        { name: "Node.js", icon: nodejs },
        { name: "Express", icon: express },
        { name: "Python", icon: python },
        { name: "Flask", icon: flask },
        { name: "Java", icon: java },
        { name: "MySQL", icon: mysql },
        { name: "Firebase", icon: firebase },
        { name: "PostgreSQL", icon: postgresql },
      ],
    },
    {
      title: "cloud & tools",
      items: [
        { name: "Google Cloud", icon: gcp },
        { name: "Docker", icon: docker },
        { name: "Git", icon: git },
        { name: "Electron", icon: electron },
        { name: "Figma", icon: figma },
        { name: "Linux", icon: linux },
        { name: "Claude", icon: claude },
      ],
    },
    {
      title: "iot & low-level",
      items: [
        { name: "MicroPython", icon: micropython },
        { name: "C", icon: c },
      ],
    },
  ];

  const profile = [
    { key: "degree", value: '"B.Sc. Computer Science"' },
    { key: "based_in", value: '"Brazil"' },
    { key: "rn", value: '"full stack dev @ work"' },
    { key: "speaks", value: '["pt-BR", "en"]' },
    { key: "offline", value: '["video games", "puzzles"]' },
    { key: "vibe", value: '"if it works, don\'t touch it"' },
  ];
  
  const projects = [
    {
      name: "Conta-Gotas",
      description:
        "My personal finance app, built on Open Finance. Bank accounts connect through Pluggy, a webhook keeps transactions in sync with Supabase (Postgres with row-level security and realtime updates), and every expense gets categorized on its own: my past corrections first, then merchant rules, then Claude through the Anthropic API. It also tracks credit card bills, investments, budgets per category and savings goals.",
      tags: [
        { name: "Supabase", color: "blue-text-gradient" },
        { name: "TypeScript / Deno", color: "green-text-gradient" },
        { name: "Open Finance", color: "pink-text-gradient" },
        { name: "Claude API", color: "blue-text-gradient" },
        { name: "GitHub Actions", color: "green-text-gradient" },
      ],
      image: contagotas,
      source_code_link: "https://github.com/Henrick1/conta-gotas",
    },
    {
      name: "IoT Parking",
      description:
        "A parking lot that knows which spots are free. ESP32 ultrasonic sensors (simulated on Wokwi) publish over MQTT to a Flask app, where staff log in to manage spots, opening hours, sensors and actuators, all stored in MySQL through SQLAlchemy.",
      tags: [
        { name: "Python & Flask", color: "blue-text-gradient" },
        { name: "ESP32 & MQTT", color: "pink-text-gradient" },
        { name: "MySQL", color: "green-text-gradient" },
      ],
      image: iotpark,
      source_code_link: "https://github.com/Henrick1/IOT-Parking",
    },
    {
      name: "Tabfolio",
      description:
        "A browser extension for Chrome, Edge, Brave and Opera that keeps tabs organized in workspaces per project. Switching workspaces saves and closes the current tabs and opens the next set in the same window. Every tab change is saved automatically, pinned tabs stay global, and each workspace has drag-and-drop resource groups, search, keyboard shortcuts, lazy loading to save memory and JSON backup. No server: everything lives in chrome.storage.",
      tags: [
        { name: "Chrome Extension (MV3)", color: "blue-text-gradient" },
        { name: "JavaScript", color: "green-text-gradient" },
        { name: "Service Worker", color: "pink-text-gradient" },
        { name: "chrome.storage", color: "blue-text-gradient" },
      ],
      image: tabfolio,
    },
    {
      name: "3D Developer Portfolio",
      description:
        "This website. React with Three.js scenes through React Three Fiber, styled with Tailwind and built with Vite. Models are compressed and lazy-loaded, the skill balls share a single WebGL canvas, and GitHub Actions redeploys it on every push.",
      tags: [
        { name: "React", color: "blue-text-gradient" },
        { name: "Three.js", color: "green-text-gradient" },
        { name: "Tailwind CSS", color: "pink-text-gradient" },
        { name: "Vite", color: "blue-text-gradient" },
      ],
      image: portfolio,
      source_code_link: "https://github.com/Henrick1/portfolio",
    },
  ];
  
  export { services, techGroups, profile, projects };