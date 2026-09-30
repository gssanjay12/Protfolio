export interface AchievementItem {
  id: string;
  indexTag: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  image: string;
  images?: string[];
  date: string;
  organization: string;
}

export const achievementsData: AchievementItem[] = [
  {
    id: "achieve-01",
    indexTag: "ACHV-001",
    title: "BEST INNOVATIVE SOLUTION",
    subtitle: "ClassSync Academic Platform",
    category: "WINNER",
    description:
      "Awarded Best Innovative Solution Award in the Techsparta' 2K26 Hackathon for ClassSync, recognized for solving academic scheduling, room coordination, and constraint satisfaction using intelligent heuristic algorithms.",
    image: "/achievements/classsync-award.png",
    images: [
      "/achievements/classsync-award.png",
      "/achievements/classsync-ceremony.jpg",
    ],
    date: "September 2026",
    organization: "Techsparta' 2K26 Hackathon • Dr. MCET",
  },
  {
    id: "achieve-02",
    indexTag: "ACHV-002",
    title: "DATA SCIENCE INTERNSHIP",
    subtitle: "Oasis Infobyte • Star Performer",
    category: "COMPLETED",
    description:
      "Successfully completed a 1-month AICTE OIB-SIP Data Science Internship with wonderful remarks. Recognized as a Star Performer for exceptional dedication, delivering exploratory data analysis, machine learning classification, and predictive modeling pipelines. Awarded an official Letter of Recommendation.",
    image: "/achievements/oasis-completion.png",
    images: [
      "/achievements/oasis-completion.png",
      "/achievements/oasis-star-performer.png",
      "/achievements/oasis-lor.png",
    ],
    date: "August 2026",
    organization: "Oasis Infobyte • AICTE OIB-SIP (OIB/L1/IP307)",
  },
  {
    id: "achieve-03",
    indexTag: "ACHV-003",
    title: "ACADEMIC EXCELLENCE",
    subtitle: "B.Tech AI & Data Science",
    category: "SCHOLAR",
    description:
      "Undergraduate engineering student studying machine learning foundations, algorithms, and practical applications in artificial intelligence.",
    image: "/achievements/academic-merit.jpg",
    date: "2025 — 2029",
    organization: "Undergraduate Degree Program",
  },
];
