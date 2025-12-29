import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
     className="flex-1"
    >
      <Text className="text-light-300">Hello  </Text>
      <Link href="/movies/avenger"> Avenger Movie</Link>

    </View>
  );
}
