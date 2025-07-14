import { config } from "./config"
import { useAuth } from "@clerk/clerk-expo";

export async function graphqlClient(gql, token) {
  const { getToken } = useAuth();
  const token = await getToken();

  const response = await fetch(`${config.API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(gql)
  })

  return await response.json();
}
