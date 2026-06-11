export type PaymentStatus = "paid" | "pending";

export type ClassPaymentStudent = {
  id: string;
  name: string;
  status: PaymentStatus;
};

export type ClassPaymentSummary = {
  className: string;
  students: ClassPaymentStudent[];
};

function buildStudents(
  className: string,
  names: string[],
  pendingNames: string[],
): ClassPaymentSummary {
  return {
    className,
    students: names.map((name, index) => ({
      id: `${className.toLowerCase().replace(/\s/g, "-")}-${index + 1}`,
      name,
      status: pendingNames.includes(name) ? "pending" : "paid",
    })),
  };
}

export const classWisePayments: ClassPaymentSummary[] = [
  buildStudents(
    "CSE-A",
    [
      "Aarav Mehta",
      "Ananya Reddy",
      "Dev Patel",
      "Isha Gupta",
      "Karthik Nair",
      "Lakshmi Rao",
      "Manoj Singh",
      "Neha Verma",
      "Omkar Joshi",
      "Pooja Iyer",
    ],
    ["Manoj Singh"],
  ),
  buildStudents(
    "CSE-B",
    [
      "Diya Sharma",
      "Eshan Kapoor",
      "Farhan Ali",
      "Gauri Nambiar",
      "Harsh Vardhan",
      "Irfan Sheikh",
      "Jyoti Mishra",
      "Kunal Agarwal",
      "Lavanya S",
      "Mohit Jain",
    ],
    ["Farhan Ali", "Mohit Jain"],
  ),
  buildStudents(
    "CSE-C",
    [
      "Rahul Kumar",
      "Priya Sharma",
      "Arjun Nair",
      "Kiran Patel",
      "Sneha Reddy",
      "Amit Joshi",
      "Bhavya Iyer",
      "Chetan Rao",
      "Divya Menon",
      "Esha Verma",
    ],
    ["Arjun Nair", "Kiran Patel"],
  ),
  buildStudents(
    "CSE-D",
    [
      "Nisha Thomas",
      "Rohan Das",
      "Sahana K",
      "Tejas Rao",
      "Vani Menon",
      "Yusuf Khan",
      "Akash B",
      "Charu S",
      "Dinesh P",
      "Elina Roy",
    ],
    ["Vani Menon", "Yusuf Khan"],
  ),
  buildStudents(
    "CSE-E",
    [
      "Faiza Ali",
      "Girish M",
      "Hiral Shah",
      "Ivan D",
      "Janani R",
      "Kevin Mathew",
      "Lata N",
      "Milan S",
      "Naveen K",
      "Ojas R",
    ],
    ["Ivan D", "Milan S", "Ojas R"],
  ),
];

export function getClassPaymentStats(classPayment: ClassPaymentSummary) {
  const totalStudents = classPayment.students.length;
  const paidStudents = classPayment.students.filter(
    (student) => student.status === "paid",
  ).length;
  const pendingStudents = totalStudents - paidStudents;
  const collectionRate = Math.round((paidStudents / totalStudents) * 100);

  return {
    collectionRate,
    paidStudents,
    pendingStudents,
    totalStudents,
  };
}
