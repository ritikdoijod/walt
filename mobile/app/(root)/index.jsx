import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { BalanceCard } from "../../components/balance-card";
import { Loader } from "../../components/loader";
import { SignOutButton } from "../../components/sign-out-button";
import {
  NoTransactionFound,
  TransactionItem,
} from "../../components/transactions";

import { colors } from "../../assets/styles/colors";
import { styles } from "../../assets/styles/home";
import { useGQLClient } from "../../gql";

export default function Page() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState();
  const [loading, setLoading] = useState(true);

  const { user } = useUser();

  const router = useRouter();
  const { client } = useGQLClient();

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await client({
        query: `
        query {
            getTransactions {
              id
              title
              amount
              category
              created_at
            }
            getSummary {
              balance
              income
              expenses
            }
          }`,
      });
      setTransactions(data.getTransactions);
      setSummary(data.getSummary);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            style={styles.headerLogo}
            source={require("../../assets/images/logo.png")}
            resizeMode="contain"
          />
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome,</Text>
            <Text style={styles.usernameText}>
              {user.firstName} {user.lastName[0]}.
            </Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/create")}
          >
            <Ionicons name="add" size={20} color={colors.white} />
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
          <SignOutButton />
        </View>
      </View>

      {loading ? (
        <Loader />
      ) : (
        <View style={styles.content}>
          {/* balance card */}
          <BalanceCard summary={summary} />

          <View style={styles.transactionsListContainer}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <FlatList
              style={styles.transactionsList}
              contentContainerStyle={styles.transactionsListContent}
              data={transactions}
              renderItem={({ item }) => <TransactionItem item={item} />}
              ListEmptyComponent={<NoTransactionFound />}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={fetchData} />
              }
            />
          </View>
        </View>
      )}
    </View>
  );
}
