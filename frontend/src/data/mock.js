// Mock data for portfolio - Replace with real data later

export const personalInfo = {
  name: "Alex Kumar",
  title: "Full-Stack Developer",
  tagline: "Building scalable web applications with modern technologies",
  bio: "BTech Computer Science student passionate about creating efficient, user-friendly web applications. Experienced in full-stack development with a focus on React, Node.js, and PostgreSQL. Always eager to learn new technologies and solve complex problems.",
  email: "alex.kumar@example.com",
  phone: "+91 98765 43210",
  location: "India",
  resumeUrl: "#",
  social: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  }
};

export const skills = {
  frontend: [
    { name: "React", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "TypeScript", level: 80 },
    { name: "Tailwind CSS", level: 85 },
    { name: "HTML/CSS", level: 90 },
    { name: "Redux", level: 75 }
  ],
  backend: [
    { name: "Node.js", level: 85 },
    { name: "Express.js", level: 85 },
    { name: "PostgreSQL", level: 80 },
    { name: "MongoDB", level: 75 },
    { name: "REST APIs", level: 85 },
    { name: "GraphQL", level: 70 }
  ],
  tools: [
    { name: "Git", level: 85 },
    { name: "Docker", level: 70 },
    { name: "AWS", level: 65 },
    { name: "Postman", level: 80 },
    { name: "VS Code", level: 90 },
    { name: "Linux", level: 75 }
  ]
};

export const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with user authentication, product management, shopping cart, and payment integration. Built with React, Node.js, and PostgreSQL.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    tags: ["React", "Node.js", "PostgreSQL", "Express", "Stripe"],
    category: "fullstack",
    github: "https://github.com",
    demo: "https://example.com",
    featured: true
  },
  {
    id: 2,
    title: "Task Management System",
    description: "Collaborative task management application with real-time updates, team collaboration features, and analytics dashboard. Supports drag-and-drop functionality.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    tags: ["React", "Node.js", "MongoDB", "Socket.io", "Redux"],
    category: "fullstack",
    github: "https://github.com",
    demo: "https://example.com",
    featured: true
  },
  {
    id: 3,
    title: "Social Media Dashboard",
    description: "Analytics dashboard for social media metrics with data visualization, real-time updates, and export functionality. Clean UI with dark mode support.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Chart.js"],
    category: "frontend",
    github: "https://github.com",
    demo: "https://example.com",
    featured: true
  },
  {
    id: 4,
    title: "Weather Forecast App",
    description: "Weather application with location-based forecasts, 7-day predictions, and interactive maps. Responsive design with smooth animations.",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop",
    tags: ["React", "API Integration", "Tailwind CSS"],
    category: "frontend",
    github: "https://github.com",
    demo: "https://example.com",
    featured: false
  },
  {
    id: 5,
    title: "REST API for Blog",
    description: "RESTful API for a blogging platform with authentication, CRUD operations, pagination, and search functionality. Fully documented with Swagger.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
    tags: ["Node.js", "Express", "PostgreSQL", "JWT"],
    category: "backend",
    github: "https://github.com",
    demo: null,
    featured: false
  },
  {
    id: 6,
    title: "Chat Application",
    description: "Real-time chat application with group chats, direct messaging, file sharing, and online status indicators. Built with WebSocket for instant communication.",
    image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&h=600&fit=crop",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    category: "fullstack",
    github: "https://github.com",
    demo: "https://example.com",
    featured: false
  }
];

export const experience = [
  {
    id: 1,
    type: "education",
    title: "Bachelor of Technology in Computer Science",
    organization: "XYZ Institute of Technology",
    location: "India",
    duration: "2021 - 2025",
    description: "CGPA: 8.5/10. Relevant coursework: Data Structures, Algorithms, Database Management, Web Development, Software Engineering."
  },
  {
    id: 2,
    type: "experience",
    title: "Full-Stack Development Intern",
    organization: "Tech Solutions Pvt. Ltd.",
    location: "Remote",
    duration: "Jun 2024 - Aug 2024",
    description: "Developed and maintained web applications using React and Node.js. Collaborated with team to implement new features and fix bugs. Improved application performance by 30%."
  },
  {
    id: 3,
    type: "experience",
    title: "Web Development Intern",
    organization: "StartUp Inc.",
    location: "Bangalore, India",
    duration: "Dec 2023 - Feb 2024",
    description: "Built responsive web interfaces using React and Tailwind CSS. Integrated REST APIs and implemented user authentication. Worked in an Agile development environment."
  },
  {
    id: 4,
    type: "education",
    title: "Senior Secondary (12th)",
    organization: "ABC Public School",
    location: "India",
    duration: "2020 - 2021",
    description: "Percentage: 92%. Science Stream with Computer Science."
  }
];

export const certifications = [
  {
    name: "Full-Stack Web Development",
    issuer: "Coursera",
    date: "2024"
  },
  {
    name: "React - The Complete Guide",
    issuer: "Udemy",
    date: "2023"
  },
  {
    name: "Node.js Certification",
    issuer: "FreeCodeCamp",
    date: "2023"
  }
];