import { ObjectId } from "mongodb";
import { client } from "./db/connection.js";

const db = client.db("sample_analytics");
const customers = db.collection("customers");
const transactions = db.collection("transactions");

export const resolvers = {
  Query: {
    Customers: async (_) => {
      try {
        const allCustomers = await customers.find({}).toArray();
        console.log(allCustomers, "all");
        return allCustomers;
      } catch (error) {
        throw new Error(`Could not fetch customers: ${error.message}`);
      }
    },
    Customer: async (_, { id }) => {
      try {
        const customer = await customers.findOne({ _id: new ObjectId(id) });
        if (!customer) {
          throw new Error(`No customer found with the id ${id}`);
        }
        return customer;
      } catch (error) {
        throw new Error(`Could not fetch customer: ${error.message}`);
      }
    },
    TransactionsPerAccount: async (_, { accountId }) => {
      try {
        const transactionsPerAccount = await transactions.findOne({
          account_id: accountId,
        });
        return transactionsPerAccount.transactions;
      } catch (error) {
        throw new Error(
          `Could not fetch transactions for account ${accountId}: ${error.message}`,
        );
      }
    },
  },
  Customer: {
    id: ({ _id }) => _id,
    tierAndDetails: ({ tier_and_details }) => {
      return Object.values(tier_and_details);
    },
  },
  Transaction: {
    code: ({ transaction_code }) => transaction_code,
  },
};
