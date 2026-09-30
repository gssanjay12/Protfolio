export interface SkillCategory {
  id: string;
  category: string;
  description: string;
  systemTag: string;
  items: {
    name: string;
    level: "CORE" | "PRACTICED";
    context: string;
  }[];
}

export const skillsData: SkillCategory[] = [
  {
    id: "programming",
    category: "PROGRAMMING",
    description: "Core programming and algorithmic problem solving languages",
    systemTag: "SYS.LANG_01",
    items: [
      { name: "Python", level: "CORE", context: "Primary AI, ML and data science language" },
      { name: "Java", level: "PRACTICED", context: "Object-oriented software systems and DSA" },
      { name: "C", level: "PRACTICED", context: "Low-level programming and memory fundamentals" },
      { name: "SQL", level: "CORE", context: "Database queries, schema design and aggregations" },
    ],
  },
  {
    id: "aiml",
    category: "AI / MACHINE LEARNING",
    description: "Machine learning algorithms, neural network frameworks, and agent systems",
    systemTag: "SYS.AI_02",
    items: [
      { name: "Machine Learning", level: "CORE", context: "Supervised and unsupervised learning algorithms" },
      { name: "PyTorch", level: "CORE", context: "Deep learning tensor modeling and neural networks" },
      { name: "Scikit-learn", level: "CORE", context: "Pipelines, classification, regression, and metrics" },
      { name: "Computer Vision", level: "CORE", context: "Image processing and visual classification" },
      { name: "Agentic AI", level: "CORE", context: "Autonomous agent workflows and task orchestration" },
    ],
  },
  {
    id: "data",
    category: "DATA SCIENCE",
    description: "Data manipulation, statistical analysis, and visual reporting",
    systemTag: "SYS.DATA_03",
    items: [
      { name: "NumPy", level: "CORE", context: "Numerical array manipulation and linear algebra" },
      { name: "Pandas", level: "CORE", context: "Data manipulation, transformation, and analysis" },
      { name: "Matplotlib", level: "CORE", context: "Data visualization and statistical plotting" },
      { name: "Data Analysis", level: "CORE", context: "Exploratory data analysis and pattern synthesis" },
    ],
  },
  {
    id: "tools",
    category: "TOOLS",
    description: "Development environments and version control toolchains",
    systemTag: "SYS.TOOLS_04",
    items: [
      { name: "Git", level: "CORE", context: "Version control and branch management" },
      { name: "GitHub", level: "CORE", context: "Code hosting, repositories, and collaboration" },
      { name: "VS Code", level: "CORE", context: "Development environment and debugging" },
    ],
  },
];
