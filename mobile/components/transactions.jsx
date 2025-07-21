import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Alert, Text, TouchableOpacity, View } from "react-native";

import { colors } from "../assets/styles/colors";
import { styles } from "../assets/styles/home";

import { useGQLClient } from "../gql";
import { formatDate } from "../utils";

const CATEGORY_ICONS = {
  "Food & Drinks": "fast-food",
  Shopping: "cart",
  Transportation: "car",
  Entertainment: "film",
  Bills: "receipt",
  Income: "cash",
  Other: "ellipsis-horizontal",
};

export function TransactionItem({ item }) {
  const isIncome = parseFloat(item.amount) > 0;
  const iconName = CATEGORY_ICONS[item.category] || "pricetag-outline";
  const { client } = useGQLClient();

  const deleteTransaction = async () => {
    try {
      await client({
        query: `
          mutation DeleteTransaction($id: Int!) {
            deleteTransaction(id: $id)
          }
        `,
        variables: {
          id: item.id,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: deleteTransaction },
      ],
    );
  };

  return (
    <View key={item.id} style={styles.transactionCard}>
      <TouchableOpacity style={styles.transactionContent}>
        <View style={styles.categoryIconContainer}>
          <Ionicons
            name={iconName}
            size={22}
            color={isIncome ? colors.income : colors.expense}
          />
        </View>
        <View style={styles.transactionLeft}>
          <Text style={styles.transactionTitle}>{item.title}</Text>
          <Text style={styles.transactionCategory}>{item.category}</Text>
        </View>
        <View style={styles.transactionRight}>
          <Text
            style={[
              styles.transactionAmount,
              { color: isIncome ? colors.income : colors.expense },
            ]}
          >
            {Math.abs(parseFloat(item.amount)).toFixed(2)}
          </Text>
          <Text style={styles.transactionDate}>
            {formatDate(item.created_at)}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Ionicons name="trash-outline" size={20} color={colors.expense} />
      </TouchableOpacity>
    </View>
  );
}

export function NoTransactionFound() {
  const router = useRouter();

  return (
    <View style={styles.emptyState}>
      <Ionicons
        name="receipt-outline"
        size={60}
        color={colors.textLight}
        style={styles.emptyStateIcon}
      />
      <Text style={styles.emptyStateTitle}>No transactions yet</Text>
      <Text style={styles.emptyStateText}>
        Start tracking your finances by adding your first transaction
      </Text>
      <TouchableOpacity
        style={styles.emptyStateButton}
        onPress={() => router.push("/create")}
      >
        <Ionicons name="add-circle" size={18} color={colors.white} />
        <Text style={styles.emptyStateButtonText}>Add Transaction</Text>
      </TouchableOpacity>
    </View>
  );
}
