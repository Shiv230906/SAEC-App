import { StyleSheet, View } from "react-native";

import { Card, Screen, Text } from "@/src/components/ui";
import {
  formatCurrency,
  studentPayments,
  studentPaymentsSummary,
} from "@/src/data/studentMockData";
import { COLORS, FONT_FAMILY, RADIUS, SPACING } from "@/src/theme";

function statusColor(status: "paid" | "pending" | "overdue") {
  if (status === "paid") {
    return COLORS.success;
  }

  if (status === "overdue") {
    return COLORS.error;
  }

  return COLORS.warning;
}

export function StudentPaymentsScreen() {
  const { paid, pending, total } = studentPaymentsSummary;

  return (
    <Screen
      scrollable
      contentContainerStyle={styles.container}
      style={styles.screen}
    >
      <View style={styles.header}>
        <Text variant="subHeading">Payments</Text>
        <Text color={COLORS.textSecondary} variant="body">
          Review fee payments, pending dues, and transaction history.
        </Text>
      </View>

      <Card style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text color={COLORS.textSecondary} variant="caption">
              Total Fee
            </Text>
            <Text variant="innerHeading">{formatCurrency(total)}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text color={COLORS.textSecondary} variant="caption">
              Paid
            </Text>
            <Text color={COLORS.success} variant="innerHeading">
              {formatCurrency(paid)}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text color={COLORS.textSecondary} variant="caption">
              Pending
            </Text>
            <Text color={COLORS.warning} variant="innerHeading">
              {formatCurrency(pending)}
            </Text>
          </View>
        </View>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${Math.round((paid / total) * 100)}%` },
            ]}
          />
        </View>
      </Card>

      <View style={styles.section}>
        <Text variant="innerHeading">Payment History</Text>

        {studentPayments.map((payment) => (
          <Card key={payment.id} style={styles.paymentCard}>
            <View style={styles.paymentHeader}>
              <View style={styles.paymentCopy}>
                <Text variant="body">{payment.title}</Text>
                <Text color={COLORS.textSecondary} variant="caption">
                  {payment.date}
                </Text>
              </View>
              <View style={styles.paymentMeta}>
                <Text variant="body">{formatCurrency(payment.amount)}</Text>
                <View
                  style={[
                    styles.statusPill,
                    {
                      backgroundColor: `${statusColor(payment.status)}22`,
                    },
                  ]}
                >
                  <Text
                    color={statusColor(payment.status)}
                    style={styles.statusText}
                    variant="caption"
                  >
                    {payment.status.toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>
          </Card>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  header: {
    gap: SPACING.xs,
  },
  paymentCard: {
    gap: SPACING.xs,
  },
  paymentCopy: {
    flex: 1,
    gap: SPACING.xs,
  },
  paymentHeader: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: SPACING.md,
    justifyContent: "space-between",
  },
  paymentMeta: {
    alignItems: "flex-end",
    gap: SPACING.xs,
  },
  progressFill: {
    backgroundColor: COLORS.success,
    borderRadius: RADIUS.pill,
    height: "100%",
  },
  progressTrack: {
    backgroundColor: COLORS.accentBlueMuted,
    borderRadius: RADIUS.pill,
    height: 8,
    overflow: "hidden",
  },
  screen: {
    backgroundColor: COLORS.pageBackground,
  },
  section: {
    gap: SPACING.md,
  },
  statusPill: {
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  statusText: {
    fontFamily: FONT_FAMILY.semiBold,
  },
  summaryCard: {
    gap: SPACING.md,
  },
  summaryItem: {
    alignItems: "center",
    flex: 1,
    gap: SPACING.xs,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default StudentPaymentsScreen;
