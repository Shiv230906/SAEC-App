export type NoteFileType = "DOC" | "PDF" | "PPT" | "Video";

export type FacultyNoteMaterial = {
  className: string;
  description: string;
  facultyName: string;
  fileName: string;
  fileType: NoteFileType;
  id: string;
  subject: string;
  title: string;
  uploadDate: string;
};

export const noteSubjects = ["DBMS", "Operating Systems", "Computer Networks"];

export const noteClasses = ["CSE A", "CSE B", "CSE C"];

export const noteFileTypes: NoteFileType[] = ["PDF", "PPT", "DOC", "Video"];

export const facultyNotesInitial: FacultyNoteMaterial[] = [
  {
    className: "CSE C",
    description: "Unit 2 notes covering normal forms and decomposition.",
    facultyName: "Dr. John Doe",
    fileName: "normalization.pdf",
    fileType: "PDF",
    id: "note-1",
    subject: "DBMS",
    title: "Normalization Notes",
    uploadDate: "Uploaded 2 days ago",
  },
  {
    className: "CSE C",
    description: "Transaction states, ACID properties, and schedules.",
    facultyName: "Dr. John Doe",
    fileName: "dbms-transactions.pdf",
    fileType: "PDF",
    id: "note-2",
    subject: "DBMS",
    title: "DBMS Transactions",
    uploadDate: "Uploaded Today",
  },
  {
    className: "CSE A",
    description: "CPU scheduling and process synchronization slides.",
    facultyName: "Dr. John Doe",
    fileName: "os-unit-3.ppt",
    fileType: "PPT",
    id: "note-3",
    subject: "Operating Systems",
    title: "Operating Systems Unit 3",
    uploadDate: "Uploaded Yesterday",
  },
  {
    className: "CSE B",
    description: "Routing basics and subnetting practice problems.",
    facultyName: "Dr. John Doe",
    fileName: "cn-routing.pdf",
    fileType: "PDF",
    id: "note-4",
    subject: "Computer Networks",
    title: "Computer Networks Routing",
    uploadDate: "Uploaded Jun 8",
  },
];

export const studentNotesHub = facultyNotesInitial;

export const recentlyUploadedNotes = [
  {
    id: "recent-note-1",
    subject: "DBMS",
    title: "DBMS Transactions",
    uploaded: "Uploaded Today",
  },
  {
    id: "recent-note-2",
    subject: "Operating Systems",
    title: "Operating Systems Unit 3",
    uploaded: "Uploaded Yesterday",
  },
];

export const mockPreviewNote = {
  body:
    "This mock preview simulates opening study material inside the app. File download and storage will be connected in a later backend phase.",
  title: "Material Preview",
};
