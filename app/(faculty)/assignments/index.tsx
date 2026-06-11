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
    if (!title.trim()) {
      Alert.alert("Validation", "Please enter a title");
      return;
    }

    setSubmitting(true);

    try {
      let pdfUrl = "";

      if (pdf) {
        const fileName = `${Date.now()}-${pdf.name}`;

        const response = await fetch(pdf.uri);
        const arrayBuffer = await response.arrayBuffer();

        const { error } = await supabase.storage
          .from("assignments")
          .upload(fileName, arrayBuffer, {
            contentType: pdf.mimeType ?? "application/pdf",
            upsert: false,
          });

        if (error) throw error;

        const { data } = supabase.storage
          .from("assignments")
          .getPublicUrl(fileName);

        pdfUrl = data.publicUrl;
      }

      let isoDate: string | null = null;
      if (dueDate) {
        const parts = dueDate.split("-");
        if (parts.length === 3) {
          isoDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
      }

      const { error } = await supabase
        .from("assignments")
        .insert([
          {
            title,
            description,
            batch,
            due_date: isoDate,
            pdf_url: pdfUrl || null,
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
        <Text style={styles.darkText} variant="subHeading">Assignments</Text>
        <Text style={styles.subtitleText} variant="body">
          Create coursework and attach a PDF for students.
        </Text>
      </View>

      <Card style={styles.formCard}>
        <Text style={styles.darkText} variant="innerHeading">Create Assignment</Text>

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
          label="Due Date (DD-MM-YYYY)"
          onChangeText={(text) => {
            const cleaned = text.replace(/[^0-9]/g, "");
            let formatted = cleaned;
            if (cleaned.length > 2) formatted = cleaned.slice(0, 2) + "-" + cleaned.slice(2);
            if (cleaned.length > 4) formatted = cleaned.slice(0, 2) + "-" + cleaned.slice(2, 4) + "-" + cleaned.slice(4, 8);
            setDueDate(formatted);
          }}
          placeholder="20-06-2026"
          value={dueDate}
          keyboardType="numeric"
          maxLength={10}
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
  darkText: {
    color: "#0F172A",
  },
  subtitleText: {
    color: "#334155",
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
