import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import db from "./configs/db.js";
import logger from "./configs/logger.js";

const Transaction = new GraphQLObjectType({
  name: "Transaction",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    user_id: { type: GraphQLString },
    title: {
      type: GraphQLString,
    },
    amount: { type: GraphQLFloat },
    category: {
      type: GraphQLString,
    },
    created_at: {
      type: GraphQLString,
      resolve: (source) => source.created_at?.toISOString?.() || null,
    },
  },
});

export const queries = {
  getTransactions: {
    type: new GraphQLList(Transaction),
    resolve: async (parent, args, context, info) => {
      try {
        return await db.transactions.findMany({
          where: { user_id: context.userId }
        });
      } catch (error) {
        logger.error(error);
        throw new Error("Failed to fetch transactions");
      }
    },
  },
  getTransaction: {
    type: Transaction,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async (_, { id }) => {
      try {
        return await db.transactions.findUnique({ where: { id } });
      } catch (error) {
        logger.error(error);
        throw new Error("Failed to fetch transactions");
      }
    },
  },
  getSummary: {
    type: Transaction,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async (_, { id }) => {
      try {
        return await db.transactions.findUnique({ where: { id } });
      } catch (error) {
        logger.error(error);
        throw new Error("Failed to fetch transactions");
      }
    },
  },
};

export const mutations = {
  createTransaction: {
    type: Transaction,
    args: {
      user_id: { type: new GraphQLNonNull(GraphQLString) },
      title: { type: GraphQLString },
      amount: { type: new GraphQLNonNull(GraphQLFloat) },
      category: { type: GraphQLString },
    },
    resolve: async (_, args) => {
      try {
        return await db.transactions.create({ data: args });
      } catch (error) {
        logger.error(error);
        throw new Error("Failed to create transaction");
      }
    },
  },
  updateTransaction: {
    type: Transaction,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      title: { type: GraphQLString },
      amount: { type: new GraphQLNonNull(GraphQLFloat) },
      category: { type: GraphQLString },
    },
    resolve: async (_, args) => {
      try {
        return await db.transactions.update({});
      } catch (error) {
        logger.error(error);
        throw new Error("Failed to delete transaction");
      }
    },
  },
  deleteTransaction: {
    type: Transaction,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_, args) => {
      try {
        return await db.transactions.delete({ data: args });
      } catch (error) {
        logger.error(error);
        throw new Error("Failed to delete transaction");
      }
    },
  },
};
