import { StyleSheet } from "react-native";

import { colors } from "./colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    justifyContent: "center",
    gap: 50,
  },
  illustration: {
    width: 300,
    height: 310,
    resizeMode: "contain",
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.text,
    marginVertical: 15,
    textAlign: "center",
  },
  button: {
    marginTop: 10,
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    borderColor: colors.primary,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  buttonText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  footerText: {
    color: colors.text,
    fontSize: 16,
  },
  linkText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  verificationContainer: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  verificationTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 20,
    textAlign: "center",
  },
  verificationInput: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16,
    color: colors.text,
    width: "100%",
    textAlign: "center",
    letterSpacing: 2,
  },

  errorBox: {
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.expense,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  errorText: {
    color: colors.text,
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
  },
});
