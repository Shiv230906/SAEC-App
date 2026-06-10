import { StyleSheet } from "react-native";

import { COLORS, FONT_FAMILY, RADIUS, SPACING } from "@/src/theme";

export const dashboardStyles = StyleSheet.create({
  container: {
    gap: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  screen: {
    backgroundColor: COLORS.pageBackground,
  },
  dashboardCard: {
    gap: SPACING.md,
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  peachButton: {
    alignItems: "center",
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.sm + 2,
  },
  navyButton: {
    alignItems: "center",
    backgroundColor: COLORS.navy,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.sm + 2,
  },
  blueButton: {
    alignItems: "center",
    backgroundColor: COLORS.accentBlue,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.sm + 2,
  },
  buttonLabel: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: 14,
  },
  linkLabel: {
    fontFamily: FONT_FAMILY.semiBold,
    textAlign: "center",
  },
  pressed: {
    opacity: 0.76,
  },
  list: {
    gap: SPACING.sm,
  },
  metricCard: {
    backgroundColor: COLORS.accentBlue,
    borderRadius: RADIUS.lg,
    flex: 1,
    gap: SPACING.xs,
    padding: SPACING.md,
  },
  metricRow: {
    flexDirection: "row",
    gap: SPACING.md,
  },
  noticeItem: {
    backgroundColor: COLORS.accentBlue,
    borderRadius: RADIUS.lg,
    gap: SPACING.xs,
    padding: SPACING.md,
  },
  noticeHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  noticeList: {
    gap: SPACING.sm,
  },
  progressTrack: {
    backgroundColor: COLORS.accentBlueMuted,
    borderRadius: RADIUS.pill,
    height: 10,
    overflow: "hidden",
  },
  progressFill: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.pill,
    height: "100%",
  },
  statsRow: {
    flexDirection: "row",
    gap: SPACING.md,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
    gap: SPACING.xs,
  },
  taskRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  taskDot: {
    borderRadius: RADIUS.pill,
    height: 10,
    width: 10,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.xs,
  },
  chip: {
    borderColor: COLORS.border,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    paddingHorizontal: SPACING.sm + 2,
    paddingVertical: SPACING.xs,
  },
  chipActive: {
    backgroundColor: COLORS.navy,
    borderColor: COLORS.navy,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    alignItems: "center",
    flex: 1,
    gap: SPACING.xs,
  },
  actionIconWrap: {
    alignItems: "center",
    backgroundColor: COLORS.accentBlue,
    borderRadius: RADIUS.lg,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  activityRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  activityDot: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.pill,
    height: 8,
    marginTop: 6,
    width: 8,
  },
  overviewGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
  },
  overviewItem: {
    backgroundColor: COLORS.accentBlue,
    borderRadius: RADIUS.lg,
    flexBasis: "47%",
    flexGrow: 1,
    gap: SPACING.xs,
    minWidth: 130,
    padding: SPACING.md,
  },
});
