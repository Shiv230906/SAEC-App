import { View, Text } from "react-native";
import Navbar from "../../../src/components/Navbar";

export default function InternalMarks() {
  return (
    <View style={{ padding: 20 }}>
      <Navbar />
      <Text>Internal Marks Screen</Text>
    </View>
  );
}