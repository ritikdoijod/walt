import { graphqlClient } from "../gql"

export async function fetchTransactions() {
  const { data, errors } = await graphqlClient({
    query:
      `query {
        getTransactions {
          id
          title
          amount
          user_id
        }
      }`
  })

  if (errors) throw new Error(errors[0].message);

  return data.getTransactions;
}
