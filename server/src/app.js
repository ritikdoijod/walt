import { graphql, GraphQLObjectType, GraphQLSchema } from "graphql";
import { Hono } from "hono";

import { auth } from "./auth.js";
import { mutations, queries } from "./transaction.js";

const app = new Hono();

app.get("/", async (c) => {
  return c.text("Hello Hono!");
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      ...queries,
    },
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      ...mutations,
    },
  }),
});

app.use("/graphql", auth);

app.post("/graphql", async (c) => {
  try {
    const { query, variables } = await c.req.json();

    const result = await graphql({
      schema,
      source: query,
      contextValue: c,
      variableValues: variables,
    });

    return c.json(result);
  } catch (error) {
    return c.json({ errors: [{ message: error.message }] });
  }
});

export { app };
