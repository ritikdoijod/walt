import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/assets/styles/colors";

export function SafeScreen({ children }) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        padding: insets.top,
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      {children}
    </View>
  );
}
