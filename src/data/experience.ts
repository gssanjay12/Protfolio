export interface ExperienceItem {
  id: string;
  year: string;
  period: string;
  role: string;
  organization: string;
  type: "INTERNSHIP" | "ACADEMIC";
  badge: string;
  location: string;
  summary: string;
  highlights: string[];
  techTags: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: "exp-oasis",
    year: "2026",
    period: "2026",
    role: "Data Science Intern",
    organization: "Oasis Infobyte",
    type: "INTERNSHIP",
    badge: "INTERNSHIP",
    location: "Remote / India",
    summary:
      "Completed a data science internship executing exploratory data analysis, machine learning classification, and predictive modeling pipelines.",
    highlights: [
      "Iris Flower Classification: Implemented multi-class classification and evaluation using Scikit-learn.",
      "Car Price Prediction: Built regression models with feature scaling and multi-variable analysis for price estimation.",
      "Unemployment Analysis: Conducted exploratory data analysis and time-series visualization on state-wise datasets.",
    ],
    techTags: ["Python", "Machine Learning", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
  },
  {
    id: "exp-btech",
    year: "2025 — 2029",
    period: "2025 — 2029",
    role: "B.Tech Student — AI & Data Science",
    organization: "Undergraduate Degree Program",
    type: "ACADEMIC",
    badge: "EDUCATION",
    location: "India",
    summary:
      "Undergraduate student pursuing B.Tech in Artificial Intelligence & Data Science, focusing on machine learning foundations, algorithms, and practical applications.",
    highlights: [
      "Studying core computer science, mathematics, machine learning, and data analytics principles.",
      "Building practical projects applying AI/ML concepts to real-world problem domains.",
      "Collaborating on software engineering and data science initiatives.",
    ],
    techTags: ["Python", "Machine Learning", "Data Structures", "SQL", "Deep Learning"],
  },
];
