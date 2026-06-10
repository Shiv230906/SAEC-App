import { Image, StyleSheet, View, type ImageSourcePropType } from "react-native";

import { COLORS, SPACING } from "@/src/theme";

import { Text } from "./ui";

export type BrandMarkProps = {
  appName?: string;
  description?: string;
  source?: ImageSourcePropType;
};

export function BrandMark({
  appName = "SAEC College App",
  description = "College Management System",
  source = require("../../assets/SAEC_college_logo_login.png"),
}: BrandMarkProps) {
  return (
    <View style={styles.container}>
      <View style={styles.logoShell}>
        <Image
          accessibilityIgnoresInvertColors
          resizeMode="contain"
          source={source}
          style={styles.logo}
        />
      </View>

      <View style={styles.copy}>
        <Text style={styles.title} variant="subHeading">
          {appName}
        </Text>
        <Text color={COLORS.textSecondary} style={styles.description} variant="body">
          {description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: SPACING.md,
  },
  copy: {
    alignItems: "center",
    gap: SPACING.xs,
  },
  description: {
    textAlign: "center",
  },
  logo: {
    height: 96,
    width: 96,
  },
  logoShell: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderColor: COLORS.primaryLight,
    borderRadius: 28,
    borderWidth: 1,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.14,
    shadowRadius: 20,
    elevation: 6,
    justifyContent: "center",
    padding: SPACING.md,
  },
  title: {
    color: COLORS.primary,
    textAlign: "center",
  },
});

export default BrandMark;
