import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, Image, View, TouchableOpacity } from "react-native";
import { SignOutButton } from "../../components/sign-out-button";
import { styles } from "../../assets/styles/home"
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../assets/styles/colors";
import TransactionsList from "../../components/transactions";

export default function Page() {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image style={styles.headerLogo} source={require("../../assets/images/logo.png")} resizeMode="contain" />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernameText}>{user.emailAddresses[0]?.emailAddress.split("@")[0]}</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.addButton} onPress={() => router.push("/create")}>
              <Ionicons name="add" size={20} color={colors.white} />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <SignOutButton />
          </View>
        </View>

        {/* balance card */}

        <View>
          <Text>Recent Transactions</Text>
        </View>
      </View>

      {/* list */}
      <TransactionsList />
    </View>
  );
}
