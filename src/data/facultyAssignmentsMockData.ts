export type FacultyUploadedAssignment = {
  className: string;
  id: string;
  subject: string;
  title: string;
  uploadDate: string;
};

export const recentlyUploadedAssignments: FacultyUploadedAssignment[] = [
  {
    className: "CSE C",
    id: "assignment-1",
    subject: "DBMS",
    title: "DBMS Assignment 3",
    uploadDate: "Uploaded Yesterday",
  },
  {
    className: "CSE A",
    id: "assignment-2",
    subject: "Operating Systems",
    title: "OS Lab Record",
    uploadDate: "Uploaded Today",
  },
  {
    className: "CSE B",
    id: "assignment-3",
    subject: "Computer Networks",
    title: "CN Case Study",
    uploadDate: "Uploaded 3 days ago",
  },
];
