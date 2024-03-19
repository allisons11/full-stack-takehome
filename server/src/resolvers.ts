import { client } from "./db/connection.js";

const db = client.db("sample_analytics");
const customers = db.collection("customers");
const transactions = db.collection("transactions");

export const resolvers = {
  Query: {
    Customers: async (_) => {
      try {
        const allCustomers = await customers.find({}).toArray();
        return allCustomers;
      } catch (error) {
        throw new Error(`Could not fetch customers: ${error.message}`);
      }
    },
    Customer: async (_, { username }) => {
      try {
        const customer = await customers.findOne({ username });
        if (!customer) {
          throw new Error(`No customer found with the username ${username}`);
        }
        return customer;
      } catch (error) {
        throw new Error(`Could not fetch customer: ${error.message}`);
      }
    },
    TransactionsPerAccount: async (_, { accountId }) => {
      try {
        const transactionsPerAccount = await transactions
          .find({ account_id: accountId })
          .toArray();
        return transactionsPerAccount;
      } catch (error) {
        throw new Error(
          `Could not fetch transactions for account ${accountId}: ${error.message}`,
        );
      }
    },
  },
  Customer: {
    tierAndDetails: (customer) => {
      const { tier_and_details } = customer;
      return Object.values(tier_and_details);
    },
  },
};
