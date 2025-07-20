import { useAuth } from "@clerk/clerk-expo";

import { config } from "./config";

export function useGQLClient() {
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

    if (!response.ok)
      throw new Error((await response.text()) || "Something went wrong");

    const { data, errors } = await response.json();

    if (errors) {
      throw new Error(data.errors?.[0]?.message || "Something went wrong");
    }

    return data;
  };

  return { client };
}
