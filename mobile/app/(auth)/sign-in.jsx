import { useSSO } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { useCallback, useEffect } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";

import { styles } from "../../assets/styles/auth";
import { colors } from "../../assets/styles/colors";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function Page() {
  useWarmUpBrowser();

  const { startSSOFlow } = useSSO();

  const signIn = useCallback(async () => {
    try {
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: "oauth_google",
          redirectUrl: AuthSession.makeRedirectUri(),
        });

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "An error occurred while signing in. Please try again later.",
      );
    }
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/revenue-i1.png")}
        style={styles.illustration}
      />
      <TouchableOpacity style={styles.button} onPress={signIn}>
        <Ionicons name="logo-google" size={24} color={colors.primary} />
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
}
