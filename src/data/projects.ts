export interface Project {
  id: string;
  code: string;
  title: string;
  tagline: string;
  category: string;
  status: string;
  featured: boolean;
  award?: string;
  shortDescription: string;
  techStack: string[];
  githubUrl: string;
  systemVisualizationType: 'marine-radar' | 'schedule-matrix' | 'orthopedic-vision';
}

export const projectsData: Project[] = [
  {
    id: 'orca',
    code: 'PROJECT_01',
    title: 'ORCA',
    tagline: 'Agentic AI Marine Intelligence Platform',
    category: 'AGENTIC AI',
    status: 'ACTIVE DEPLOYMENT',
    featured: true,
    shortDescription:
      'An AI-powered marine intelligence platform designed to assist fishermen with fishing-zone recommendations, safer routes and hazard awareness.',
    techStack: [
      'Agentic AI',
      'Machine Learning',
      'Geospatial Data',
      'Satellite Feeds',
      'Python',
      'FastAPI',
      'React',
    ],
    githubUrl: 'https://github.com/sanjay-gs/orca-marine-intelligence',
    systemVisualizationType: 'marine-radar',
  },
  {
    id: 'classsync',
    code: 'PROJECT_02',
    title: 'CLASSSYNC',
    tagline: 'AI-Powered Academic Management Platform',
    category: 'SYSTEMS AI',
    status: 'AWARDED',
    award: 'BEST INNOVATIVE SOLUTION',
    featured: true,
    shortDescription:
      'An intelligent academic platform designed to simplify classroom management, student coordination and academic workflows.',
    techStack: [
      'Python',
      'Machine Learning',
      'Optimization Algorithms',
      'FastAPI',
      'React',
      'TypeScript',
    ],
    githubUrl: 'https://github.com/sanjay-gs/classsync-academic-ai',
    systemVisualizationType: 'schedule-matrix',
  },
  {
    id: 'orthopedic-ai',
    code: 'PROJECT_03',
    title: 'ORTHOPEDIC AI',
    tagline: 'AI-Based Orthopedic Analysis',
    category: 'COMPUTER VISION',
    status: 'PROTOTYPE / RESEARCH',
    featured: true,
    shortDescription:
      'An AI-based computer vision system designed to assist in the analysis and classification of orthopedic conditions from medical images.',
    techStack: [
      'Computer Vision',
      'PyTorch',
      'Python',
      'Image Processing',
      'Deep Learning',
    ],
    githubUrl: 'https://github.com/sanjay-gs',
    systemVisualizationType: 'orthopedic-vision',
  },
];
