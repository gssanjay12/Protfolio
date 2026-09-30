export interface PersonalInfo {
  name: string;
  handle: string;
  role: string;
  education: {
    degree: string;
    specialization: string;
    status: string;
  };
  focusAreas: string[];
  bio: string;
  tagline: string;
  location: string;
  status: string;
  systemVersion: string;
  contact: {
    email: string;
    github: string;
    linkedin: string;
  };
  telemetry: {
    coreEngine: string;
    activeModules: number;
    frameworkVersion: string;
    uptime: string;
  };
}

export const personalData: PersonalInfo = {
  name: "SANJAY G S",
  handle: "sanjay-gs",
  role: "AI & DATA SCIENCE ENGINEER",
  education: {
    degree: "B.Tech",
    specialization: "Artificial Intelligence & Data Science",
    status: "Undergraduate Scholar",
  },
  focusAreas: [
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "Agentic AI",

    "Full-Stack AI Applications",
  ],
  bio: "I'm a B.Tech Artificial Intelligence & Data Science student focused on Machine Learning, Artificial Intelligence, Data Science and intelligent applications. I enjoy transforming complex problems into practical technology and building systems that connect AI with real-world use cases.",
  tagline: "Building intelligent systems that turn data into real-world solutions.",
  location: "India",
  status: "BUILDING",
  systemVersion: "v2.6.4-NEURAL",
  contact: {
    email: "gssanjay128@gmail.com",
    github: "https://github.com/gssanjay12",
    linkedin: "https://www.linkedin.com/in/sanjay-g-s-495071390/?isSelfProfile=true",
  },
  telemetry: {
    coreEngine: "Neural Matrix v4.2",
    activeModules: 8,
    frameworkVersion: "React 19 / ThreeJS / WebGL",
    uptime: "99.98%",
  },
};
