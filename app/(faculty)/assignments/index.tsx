import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from "react-native";

import * as DocumentPicker from "expo-document-picker";
import { supabase } from "@/src/services/supabase";

export default function FacultyAssignments() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [batch, setBatch] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [pdf, setPdf] = useState<any>(null);

  const pickPDF = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });

    if (!result.canceled) {
      setPdf(result.assets[0]);
    }
  };

  const createAssignment = async () => {
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
    } catch (error: any) {
  console.log("FULL ERROR:", error);
  Alert.alert("Error", error?.message || JSON.stringify(error));
}
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text>Title</Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Assignment Title"
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
        }}
      />

      <Text>Description</Text>

      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        multiline
        style={{
          borderWidth: 1,
          padding: 10,
          height: 100,
          marginBottom: 10,
        }}
      />

      <Text>Batch</Text>

      <TextInput
        value={batch}
        onChangeText={setBatch}
        placeholder="2-A"
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
        }}
      />

      <Text>Due Date</Text>

      <TextInput
        value={dueDate}
        onChangeText={setDueDate}
        placeholder="2026-06-20"
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 20,
        }}
      />

      <Button
        title="Select PDF"
        onPress={pickPDF}
      />

      <View style={{ height: 20 }} />

      <Button
        title="Create Assignment"
        onPress={createAssignment}
      />
    </ScrollView>
  );
}