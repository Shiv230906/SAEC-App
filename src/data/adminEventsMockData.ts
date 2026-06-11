export type AdminEventRecord = {
  createdTime: string;
  date: string;
  description: string;
  id: string;
  title: string;
  venue: string;
};

export const recentAdminEvents: AdminEventRecord[] = [
  {
    createdTime: "Created 2 days ago",
    date: "20-07-2026",
    description: "Inter-department technical talks and project demos.",
    id: "event-1",
    title: "Tech Symposium 2026",
    venue: "Main Auditorium",
  },
  {
    createdTime: "Created Today",
    date: "28-07-2026",
    description: "Registration drive for the 24-hour coding challenge.",
    id: "event-2",
    title: "Hackathon Registration",
    venue: "Innovation Lab",
  },
  {
    createdTime: "Created Yesterday",
    date: "05-08-2026",
    description: "Aptitude and interview readiness session for final years.",
    id: "event-3",
    title: "Placement Training Session",
    venue: "Seminar Hall",
  },
];
