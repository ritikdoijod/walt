import { graphqlClient, useGQLClient } from "../gql";

export async function fetchTransactions() {
  const { client } = useGQLClient();

  try {
    const data = await client({
      query: `query {
        getTransactions {
          id
          title
          amount
          user_id
        }
      }`,
    });

    return data.getTransactions;
  } catch (error) {
    console.log(error);
  }
}
