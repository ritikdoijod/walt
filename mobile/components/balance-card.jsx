import { Text, View } from "react-native";

import { colors } from "../assets/styles/colors";
import { styles } from "../assets/styles/home";

export function BalanceCard({ summary }) {
  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceTitle}>Total Balance</Text>
      <Text style={styles.balanceAmount}>
        $ {Math.abs(parseFloat(summary.balance)).toFixed(2)}
      </Text>
      <View style={styles.balanceStats}>
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Income</Text>
          <Text style={[styles.balanceStatAmount, { color: colors.income }]}>
            {Math.abs(parseFloat(summary.income)).toFixed(2)}
          </Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Expense</Text>
          <Text style={[styles.balanceStatAmount, { color: colors.expense }]}>
            {Math.abs(parseFloat(summary.expenses)).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
}
