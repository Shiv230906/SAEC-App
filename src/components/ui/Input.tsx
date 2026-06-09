import {
  StyleSheet,
  TextInput,
  type StyleProp,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
  View,
} from "react-native";

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from "@/src/theme";

import { Text } from "./Text";

export type InputProps = TextInputProps & {
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  error?: string;
  inputStyle?: StyleProp<TextStyle>;
  label?: string;
};

export function Input({
  containerStyle,
  disabled = false,
  editable,
  error,
  inputStyle,
  label,
  placeholderTextColor = COLORS.gray500,
  style,
  ...props
}: InputProps) {
  const isEditable = !disabled && editable !== false;

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? (
        <Text color={COLORS.textSecondary} variant="caption">
          {label}
        </Text>
      ) : null}

      <TextInput
        {...props}
        editable={isEditable}
        placeholderTextColor={placeholderTextColor}
        style={[
          styles.input,
          error ? styles.inputError : undefined,
          !isEditable ? styles.inputDisabled : undefined,
          inputStyle,
          style,
        ]}
      />

      {error ? (
        <Text color={COLORS.error} selectable variant="caption">
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.xs,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    color: COLORS.textPrimary,
    fontFamily: TYPOGRAPHY.body.fontFamily,
    fontSize: TYPOGRAPHY.body.fontSize,
    minHeight: SPACING.xxl,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  inputDisabled: {
    backgroundColor: COLORS.gray100,
    color: COLORS.textSecondary,
  },
  inputError: {
    borderColor: COLORS.error,
  },
});

export default Input;
