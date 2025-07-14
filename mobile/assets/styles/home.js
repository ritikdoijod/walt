import { StyleSheet } from "react-native";
import { colors } from "./colors";
import { HeaderTitle } from "@react-navigation/elements";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 0
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 0,
    paddingVertical: 12
  },
  headerLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  headerLogo: {
    width: 75,
    height: 75
  },
  welcomeContainer: {
    flex: 1
  },
  welcomeText: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 2
  },
  usernameText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  addButtonText: {
    color: colors.white,
    fontWeight: "600",
    marginLeft: 4
  },
  logoutButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: colors.card,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOffset: 0.05,
    shadowRadius: 2,
    elevation: 1
  }
});
