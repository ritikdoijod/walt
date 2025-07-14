import { config } from "./config";
import { useAuth } from "@clerk/clerk-expo";

export function useGQLClient(gql) {
  const { getToken } = useAuth();

  const client = async (gql) => {
    const token = await getToken();

    const response = await fetch(`${config.API_URL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(gql),
    });

    const { data, errors } = await response.json();
    
    if (errors) {
      throw new Error(data.errors?.[0]?.message || "Something went wrong");
    }

    return data;
  };

  return { client };
}
