import { Link } from "expo-router";
import { View, Text } from "react-native";


export default function Page() {
  return (
    <View>
      <Text>Faculty Dashboard</Text>
    
    <Link href="/(faculty)/assignments">
          Go to Assignments
        </Link>
    </View>
  );
}