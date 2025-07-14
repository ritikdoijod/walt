import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { fetchTransactions } from "../api/transaction";

export default function TransactionsList() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions()
      .then(setTransactions)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator />;

  return (
    <View>
      {transactions.map((tx) => (
        <Text key={tx.id}>
          {tx.title}: {tx.amount}
        </Text>
      ))}
    </View>
  );
}
