export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface Payment {
  amount: number;
  currency: string;
  dueDate?: string | null;
  id: string;
  paidAt?: string | null;
  status: PaymentStatus;
  studentId: string;
}
