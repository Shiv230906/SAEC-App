import { StyleSheet, View } from "react-native";

import { Card, Screen, Text } from "@/src/components/ui";
import { COLORS, FONT_FAMILY, RADIUS, SPACING } from "@/src/theme";

type PaymentRecord = {
  id: string;
  studentName: string;
  transactionId: string;
  amount: number;
  date: string;
  status: "paid" | "pending" | "overdue";
};

const MOCK_PAYMENTS: PaymentRecord[] = [
  { id: "1", studentName: "Rahul Sharma", transactionId: "TXN-2026-00142", amount: 45000, date: "Jun 10, 2026", status: "paid" },
  { id: "2", studentName: "Priya Nair", transactionId: "TXN-2026-00143", amount: 45000, date: "Jun 9, 2026", status: "paid" },
  { id: "3", studentName: "Arjun Patel", transactionId: "TXN-2026-00144", amount: 12000, date: "Jun 8, 2026", status: "paid" },
  { id: "4", studentName: "Meera Joshi", transactionId: "TXN-2026-00145", amount: 45000, date: "Due Jun 25", status: "pending" },
  { id: "5", studentName: "Kiran Kumar", transactionId: "TXN-2026-00146", amount: 8000, date: "Due Jun 15", status: "overdue" },
  { id: "6", studentName: "Deepak S", transactionId: "TXN-2026-00147", amount: 45000, date: "Due Jun 25", status: "pending" },
  { id: "7", studentName: "Sneha Reddy", transactionId: "TXN-2026-00148", amount: 10000, date: "Jun 5, 2026", status: "paid" },
  { id: "8", studentName: "Vikram Singh", transactionId: "TXN-2026-00149", amount: 12000, date: "Due Jun 20", status: "overdue" },
];

const STATUS_CONFIG = {
  paid: { label: "Paid", bg: "#DCFCE7", text: "#16A34A" },
  pending: { label: "Pending", bg: "#FEF9C3", text: "#CA8A04" },
  overdue: { label: "Overdue", bg: "#FEE2E2", text: "#DC2626" },
} as const;

function formatCurrency(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function AdminPayments() {
  const totalCollected = MOCK_PAYMENTS
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);
  const totalPending = MOCK_PAYMENTS
    .filter((p) => p.status !== "paid")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <Screen scrollable contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text variant="subHeading">Manage Payments</Text>
        <Text color={COLORS.textSecondary} variant="body">
          Track student fee payments and transactions.
        </Text>
      </View>

      <View style={styles.statsRow}>
        <Card style={styles.statCard}>
          <Text color={COLORS.textSecondary} variant="caption">Collected</Text>
          <Text color={COLORS.success} variant="innerHeading">{formatCurrency(totalCollected)}</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text color={COLORS.textSecondary} variant="caption">Pending</Text>
          <Text color={COLORS.error} variant="innerHeading">{formatCurrency(totalPending)}</Text>
        </Card>
      </View>

      <Card style={styles.tableCard}>
        <Text variant="innerHeading">Recent Transactions</Text>

        <View style={styles.tableHeader}>
          <Text style={styles.colName} color={COLORS.textSecondary} variant="caption">Student</Text>
          <Text style={styles.colTxn} color={COLORS.textSecondary} variant="caption">Transaction ID</Text>
          <Text style={styles.colAmount} color={COLORS.textSecondary} variant="caption">Amount</Text>
          <Text style={styles.colStatus} color={COLORS.textSecondary} variant="caption">Status</Text>
        </View>

        {MOCK_PAYMENTS.map((payment) => {
          const cfg = STATUS_CONFIG[payment.status];
          return (
            <View key={payment.id} style={styles.tableRow}>
              <View style={styles.colName}>
                <Text variant="body">{payment.studentName}</Text>
                <Text color={COLORS.textSecondary} variant="caption">{payment.date}</Text>
              </View>
              <Text style={styles.colTxn} color={COLORS.textSecondary} variant="caption">{payment.transactionId}</Text>
              <Text style={styles.colAmount} variant="body">{formatCurrency(payment.amount)}</Text>
              <View style={styles.colStatus}>
                <View style={[styles.badge, { backgroundColor: cfg.bg }]}>
                  <Text color={cfg.text} variant="caption">{cfg.label}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { gap: SPACING.lg, paddingBottom: SPACING.xl },
  header: { gap: SPACING.sm },
  statsRow: { flexDirection: "row", gap: SPACING.md },
  statCard: { flex: 1, alignItems: "center", gap: SPACING.xs },
  tableCard: { gap: SPACING.md },
  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: SPACING.xs,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  colName: { flex: 3, gap: 2 },
  colTxn: { flex: 3 },
  colAmount: { flex: 2, textAlign: "right" },
  colStatus: { flex: 2, alignItems: "flex-end" },
  badge: {
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
  },
});
