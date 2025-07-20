import { View, ActivityIndicator } from "react-native";

import { colors } from "../assets/styles/colors.js";

export function Loader() {
  return (
    <View>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}
