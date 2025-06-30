import { GraphQLFloat, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import db from "./configs/db.js";
import logger from "./configs/logger.js";

const Transaction = new GraphQLObjectType({
  name: "Transaction",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    user_id: { type: GraphQLString },
    title: {
      type: GraphQLString
    },
    amount: { type: GraphQLFloat },
    category: {
      type: GraphQLString
    },
    created_at: { type: GraphQLString, resolve: (source) => source.created_at?.toISOString?.() || null }
  }
})

export const queries = {
  getTransactions: {
    type: new GraphQLList(Transaction),
    resolve: async () => {
      try {
        return await db.transactions.findMany();
      } catch (error) {
        logger.error(error);
        throw new Error('Failed to fetch transactions');
      }
    }
  }
}
