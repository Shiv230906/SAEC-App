import { View, Text } from "react-native";
import Navbar from "../../../src/components/Navbar";
import { Link } from "expo-router";

export default function Dashboard() {
  return (
  <View style={{ padding: 20 }}>
    <Text
      style={{
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
      }}
    >
      Student Dashboard
    </Text>

    <Text>
      Welcome to SAEC College App
    </Text>

    <Link href="/(student)/assignments">
      Go to Assignments
    </Link>
  </View>
);
}


