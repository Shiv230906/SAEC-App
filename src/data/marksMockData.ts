import { getStudentsForSection, type SectionStudent } from "./attendanceMockData";

export type AssessmentType =
  | "Assignment"
  | "Internal Test 1"
  | "Internal Test 2"
  | "Lab Assessment"
  | "Model Exam";

export type FacultySubject = {
  classes: string[];
  subject: string;
};

export type StudentMarkEntry = {
  mark: number;
  maxMark: number;
  studentId: string;
  studentName: string;
};

export type StudentSubjectMarks = {
  assessments: {
    label: AssessmentType;
    maxMark: number;
    score: number;
  }[];
  average: number;
  subject: string;
};

export type AdminClassPerformance = {
  average: number;
  department: string;
  section: string;
};

export const assessmentTypes: AssessmentType[] = [
  "Internal Test 1",
  "Internal Test 2",
  "Model Exam",
  "Assignment",
  "Lab Assessment",
];

export const facultyMarksSubjects: FacultySubject[] = [
  { classes: ["CSE A", "CSE B", "CSE C"], subject: "DBMS" },
  { classes: ["CSE A", "CSE B"], subject: "Operating Systems" },
  { classes: ["CSE B", "CSE C"], subject: "Computer Networks" },
];

export const pendingMarksEntry = {
  assessment: "Internal Test 1" as AssessmentType,
  section: "CSE C",
  subject: "DBMS",
};

const cseCSeedMarks = [
  20, 19, 18, 12, 8, 17, 16, 15, 14, 13, 11, 10, 18, 7, 16, 15, 14, 13, 12, 9,
];

export function buildInitialMarks(section: string): StudentMarkEntry[] {
  return getStudentsForSection(section).map((student, index) => ({
    mark: cseCSeedMarks[index] ?? 15,
    maxMark: 20,
    studentId: student.id,
    studentName: student.name,
  }));
}

export function calculateMarksAnalytics(entries: StudentMarkEntry[]) {
  const marks = entries.map((entry) => entry.mark);
  const highest = Math.max(...marks);
  const lowest = Math.min(...marks);
  const average = Math.round(
    marks.reduce((total, mark) => total + mark, 0) / marks.length,
  );

  return { average, highest, lowest };
}

export function getRankedPerformers(entries: StudentMarkEntry[]) {
  const ranked = [...entries].sort((a, b) => b.mark - a.mark);

  return {
    bottom: ranked.slice(-5).reverse(),
    top: ranked.slice(0, 5),
  };
}

export const studentMarksSummary = {
  averageInternalScore: 84,
  needsAttention: {
    score: "11/20",
    subject: "Operating Systems",
  },
  recentPublished: {
    assessment: "Internal Test 1" as AssessmentType,
    score: "18/20",
    subject: "DBMS",
  },
  strongest: {
    score: "18/20",
    subject: "DBMS",
  },
};

export const studentSubjectMarks: StudentSubjectMarks[] = [
  {
    assessments: [
      { label: "Internal Test 1", maxMark: 20, score: 18 },
      { label: "Internal Test 2", maxMark: 20, score: 17 },
      { label: "Assignment", maxMark: 10, score: 10 },
    ],
    average: 17.5,
    subject: "DBMS",
  },
  {
    assessments: [
      { label: "Internal Test 1", maxMark: 20, score: 11 },
      { label: "Internal Test 2", maxMark: 20, score: 13 },
      { label: "Assignment", maxMark: 10, score: 8 },
    ],
    average: 12,
    subject: "Operating Systems",
  },
  {
    assessments: [
      { label: "Internal Test 1", maxMark: 20, score: 17 },
      { label: "Internal Test 2", maxMark: 20, score: 18 },
      { label: "Assignment", maxMark: 10, score: 9 },
    ],
    average: 17.5,
    subject: "Computer Networks",
  },
];

export const studentMarksTimeline = studentSubjectMarks.flatMap((subject) =>
  subject.assessments.map((assessment) => ({
    ...assessment,
    id: `${subject.subject}-${assessment.label}`,
    subject: subject.subject,
  })),
);

export const adminDepartmentPerformance = [
  { average: 78, department: "Computer Science" },
  { average: 74, department: "Electronics" },
  { average: 71, department: "Mechanical" },
];

export const adminTopPerformingClasses: AdminClassPerformance[] = [
  { average: 82, department: "CSE", section: "CSE A" },
  { average: 79, department: "CSE", section: "CSE B" },
  { average: 75, department: "CSE", section: "CSE C" },
];

export const adminStudentsNeedingSupport = [
  { average: 42, name: "Kiran Patel", section: "CSE C" },
  { average: 39, name: "Deepak S", section: "CSE B" },
  { average: 44, name: "Sneha Reddy", section: "CSE C" },
  { average: 46, name: "Anita Rao", section: "CSE A" },
];

export function buildMarksMap(students: SectionStudent[]) {
  return Object.fromEntries(students.map((student, index) => [student.id, cseCSeedMarks[index] ?? 15]));
}
