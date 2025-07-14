import { serve } from "@hono/node-server";
import { graphql, GraphQLObjectType, GraphQLSchema } from "graphql";
import { Hono } from "hono";
import { mutations, queries } from "./transaction.js";
import logger from "./configs/logger.js";
import { auth } from "./auth.js";

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
    const { query } = await c.req.json();

    const result = await graphql({
      schema,
      source: query,
    });

    return c.json(result);
  } catch (error) {
    return c.json({ errors: [{ message: error.message }] });
  }
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    logger.info(`Server is running on http://localhost:${info.port}`);
  }
);
