import {
  GraphQLBoolean,
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
    resolve: async (parent, args, c, info) => {
      try {
        return await db.transactions.findMany({
          where: { user_id: c.userId },
          orderBy: {
            created_at: "desc",
          },
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
    type: new GraphQLObjectType({
      name: "Summary",
      fields: {
        balance: { type: GraphQLFloat },
        income: { type: GraphQLFloat },
        expenses: { type: GraphQLFloat },
      },
    }),
    resolve: async (parent, args, c, info) => {
      try {
        const balance = await db.transactions.aggregate({
          _sum: { amount: true },
          where: { user_id: c.userId },
        });

        const income = await db.transactions.aggregate({
          _sum: { amount: true },
          where: {
            user_id: c.userId,
            amount: { gt: 0 },
          },
        });

        const expenses = await db.transactions.aggregate({
          _sum: { amount: true },
          where: {
            user_id: c.userId,
            amount: { lt: 0 },
          },
        });

        return {
          balance: balance._sum.amount?.toNumber() ?? 0,
          income: income._sum.amount?.toNumber() ?? 0,
          expenses: expenses._sum.amount?.toNumber() ?? 0,
        };
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
      title: { type: GraphQLString },
      amount: { type: new GraphQLNonNull(GraphQLFloat) },
      category: { type: GraphQLString },
    },
    resolve: async (parent, args, c) => {
      try {
        return await db.transactions.create({
          data: { ...args, user_id: c.userId },
        });
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
    type: GraphQLBoolean,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async (_, args) => {
      try {
        await db.transactions.delete({ where: { id: args.id } });
        return true;
      } catch (error) {
        logger.error(error);
        throw new Error("Failed to delete transaction");
      }
    },
  },
};
