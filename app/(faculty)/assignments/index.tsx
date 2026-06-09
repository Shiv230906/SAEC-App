import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import * as DocumentPicker from "expo-document-picker";
import { supabase } from "@/src/services/supabase";
import { Button, Card, Input, Screen, Text } from "@/src/components/ui";
import { COLORS, SPACING } from "@/src/theme";

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return String(error);
}

export default function FacultyAssignments() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [batch, setBatch] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [pdf, setPdf] =
    useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const pickPDF = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });

    if (!result.canceled) {
      setPdf(result.assets[0]);
    }
  };

  const createAssignment = async () => {
    setSubmitting(true);

    try {
      let pdfUrl = "";

      if (pdf) {
        const response = await fetch(pdf.uri);
        const blob = await response.blob();

        const fileName = `${Date.now()}-${pdf.name}`;

        const { error } = await supabase.storage
          .from("assignments")
          .upload(fileName, blob);

        if (error) throw error;

        const { data } = supabase.storage
          .from("assignments")
          .getPublicUrl(fileName);

        pdfUrl = data.publicUrl;
      }

      const { error } = await supabase
        .from("assignments")
        .insert([
          {
            title,
            description,
            batch,
            due_date: dueDate,
            pdf_url: pdfUrl,
          },
        ]);

      if (error) throw error;

      Alert.alert("Success", "Assignment Created");

      setTitle("");
      setDescription("");
      setBatch("");
      setDueDate("");
      setPdf(null);
    } catch (error) {
      console.log("FULL ERROR:", error);
      Alert.alert("Error", getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Screen scrollable contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text variant="subHeading">Assignments</Text>
        <Text color={COLORS.textSecondary} variant="body">
          Create coursework and attach a PDF for students.
        </Text>
      </View>

      <Card style={styles.formCard}>
        <Input
          label="Title"
          onChangeText={setTitle}
          placeholder="Assignment Title"
          value={title}
        />

        <Input
          inputStyle={styles.descriptionInput}
          label="Description"
          multiline
          onChangeText={setDescription}
          placeholder="Description"
          textAlignVertical="top"
          value={description}
        />

        <Input
          label="Batch"
          onChangeText={setBatch}
          placeholder="2-A"
          value={batch}
        />

        <Input
          label="Due Date"
          onChangeText={setDueDate}
          placeholder="2026-06-20"
          value={dueDate}
        />

        <Button
          onPress={pickPDF}
          title={pdf ? pdf.name : "Select PDF"}
          variant="secondary"
        />

        <Button
          loading={submitting}
          onPress={createAssignment}
          title="Create Assignment"
        />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.lg,
  },
  descriptionInput: {
    minHeight: 112,
  },
  formCard: {
    gap: SPACING.md,
  },
  header: {
    gap: SPACING.sm,
  },
});
