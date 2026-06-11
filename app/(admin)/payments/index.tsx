import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Card, Screen, Text } from "@/src/components/ui";
import {
  classWisePayments,
  getClassPaymentStats,
  type ClassPaymentSummary,
  type PaymentStatus,
} from "@/src/data/paymentMockData";
import { COLORS, RADIUS, SPACING } from "@/src/theme";

const STATUS_CONFIG: Record<
  PaymentStatus,
  { backgroundColor: string; color: string; label: string }
> = {
  paid: {
    backgroundColor: "#DCFCE7",
    color: COLORS.success,
    label: "Paid",
  },
  pending: {
    backgroundColor: COLORS.primaryLight,
    color: COLORS.linkAccent,
    label: "Pending",
  },
};

export default function AdminPayments() {
  const [selectedClass, setSelectedClass] = useState<ClassPaymentSummary>(
    classWisePayments[2] ?? classWisePayments[0],
  );
  const selectedStats = getClassPaymentStats(selectedClass);

  return (
    <Screen
      scrollable
      contentContainerStyle={styles.container}
      style={styles.screen}
    >
      <View style={styles.header}>
        <Text variant="subHeading">Manage Payments</Text>
        <Text color={COLORS.textSecondary} variant="body">
          Monitor fee collection class-wise and review pending students.
        </Text>
      </View>

      <View style={styles.tabsRow}>
        {classWisePayments.map((classPayment) => {
          const isActive = classPayment.className === selectedClass.className;

          return (
            <Pressable
              key={classPayment.className}
              accessibilityRole="button"
              onPress={() => setSelectedClass(classPayment)}
              style={({ pressed }) => [
                styles.tab,
                isActive ? styles.tabActive : undefined,
                pressed ? styles.pressed : undefined,
              ]}
            >
              <Text
                color={isActive ? COLORS.white : COLORS.textSecondary}
                variant="caption"
              >
                {classPayment.className}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Card style={styles.studentsCard}>
        <View style={styles.classHeader}>
          <Text variant="innerHeading">{selectedClass.className} Students</Text>
          <Text color={COLORS.textSecondary} variant="caption">
            Tap a class above to switch
          </Text>
        </View>

        {selectedClass.students.map((student) => {
          const statusConfig = STATUS_CONFIG[student.status];

          return (
            <View key={student.id} style={styles.studentRow}>
              <Text style={styles.studentName} variant="body">
                {student.name}
              </Text>
              <View
                style={[
                  styles.badge,
                  { backgroundColor: statusConfig.backgroundColor },
                ]}
              >
                <Text color={statusConfig.color} variant="caption">
                  {statusConfig.label}
                </Text>
              </View>
            </View>
          );
        })}
      </Card>

      <Card style={styles.summaryCard}>
        <Text variant="innerHeading">{selectedClass.className} Summary</Text>
        <View style={styles.summaryGrid}>
          <SummaryItem label="Total Students" value={selectedStats.totalStudents} />
          <SummaryItem label="Paid" value={selectedStats.paidStudents} />
          <SummaryItem label="Pending" value={selectedStats.pendingStudents} />
          <SummaryItem
            label="Collection Rate"
            value={`${selectedStats.collectionRate}%`}
          />
        </View>
      </Card>
    </Screen>
  );
}

function SummaryItem({ label, value }: { label: string; value: number | string }) {
  return (
    <View style={styles.summaryItem}>
      <Text color={COLORS.textSecondary} variant="caption">
        {label}
      </Text>
      <Text variant="innerHeading">{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
  },
  classHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    gap: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  header: {
    gap: SPACING.sm,
  },
  pressed: {
    opacity: 0.76,
  },
  screen: {
    backgroundColor: COLORS.pageBackground,
  },
  summaryCard: {
    gap: SPACING.md,
  },
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
  },
  summaryItem: {
    alignItems: "center",
    backgroundColor: COLORS.accentBlue,
    borderRadius: RADIUS.lg,
    flexBasis: "47%",
    flexGrow: 1,
    gap: SPACING.xs,
    minWidth: 130,
    padding: SPACING.md,
  },
  studentName: {
    flex: 1,
  },
  studentRow: {
    alignItems: "center",
    backgroundColor: COLORS.accentBlue,
    borderRadius: RADIUS.lg,
    flexDirection: "row",
    gap: SPACING.md,
    padding: SPACING.md,
  },
  studentsCard: {
    gap: SPACING.sm,
  },
  tab: {
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    flex: 1,
    minWidth: 64,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
  },
  tabActive: {
    backgroundColor: COLORS.navy,
    borderColor: COLORS.navy,
  },
  tabsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
  },
});
