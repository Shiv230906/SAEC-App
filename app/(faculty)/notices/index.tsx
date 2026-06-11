import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Button, Card, Input, Screen, Text } from "@/src/components/ui";
import { facultyNotices } from "@/src/data/facultyMockData";
import { COLORS, RADIUS, SPACING } from "@/src/theme";

type NoticeRecord = {
  id: string;
  title: string;
  body: string;
  time: string;
};

export default function FacultyNotices() {
  const [notices, setNotices] = useState<NoticeRecord[]>(facultyNotices);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const createNotice = () => {
    if (!title.trim()) {
      Alert.alert("Validation", "Notice title is required.");
      return;
    }
    if (!body.trim()) {
      Alert.alert("Validation", "Notice body is required.");
      return;
    }

    setSubmitting(true);

    const newNotice: NoticeRecord = {
      id: `notice-${Date.now()}`,
      title: title.trim(),
      body: body.trim(),
      time: "Just now",
    };

    setNotices((prev) => [newNotice, ...prev]);
    Alert.alert("Success", `Notice "${title.trim()}" published.`);
    setTitle("");
    setBody("");
    setSubmitting(false);
  };

  return (
    <Screen scrollable contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.darkText} variant="subHeading">Notices</Text>
        <Text color={COLORS.textSecondary} variant="body">
          Create and view departmental notices.
        </Text>
      </View>

      <Card style={styles.formCard}>
        <Text variant="innerHeading">Create Notice</Text>

        <Input
          label="Title"
          onChangeText={setTitle}
          placeholder="Notice title"
          value={title}
        />

        <Input
          inputStyle={styles.bodyInput}
          label="Body"
          multiline
          onChangeText={setBody}
          placeholder="Write your notice here..."
          textAlignVertical="top"
          value={body}
        />

        <Button
          loading={submitting}
          onPress={createNotice}
          title="Publish Notice"
        />
      </Card>

      <View style={styles.section}>
        <Text variant="innerHeading">Notice Archive</Text>

        {notices.map((notice) => (
          <Card key={notice.id} style={styles.noticeCard}>
            <View style={styles.noticeHeader}>
              <MaterialIcons color={COLORS.primary} name="campaign" size={20} />
              <Text style={styles.noticeTitle} variant="body">{notice.title}</Text>
              <Text color={COLORS.textSecondary} variant="caption">{notice.time}</Text>
            </View>
            <Text color={COLORS.textSecondary} variant="caption">{notice.body}</Text>
          </Card>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { gap: SPACING.lg, paddingBottom: SPACING.xl },
  header: { gap: SPACING.sm },
  darkText: { color: "#0F172A" },
  formCard: { gap: SPACING.md },
  bodyInput: { minHeight: 100 },
  section: { gap: SPACING.sm },
  noticeCard: { gap: SPACING.xs },
  noticeHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  noticeTitle: { flex: 1 },
});
