import { client } from './db/connection.js';
const db = client.db('sample_analytics');
const customers = db.collection('customers');
const accounts = db.collection('accounts');
const transactions = db.collection('transactions');
export const resolvers = {
    Query: {
        getCustomers: async (_) => {
            try {
                const allCustomers = await customers.find({}).toArray();
                return allCustomers;
            }
            catch (error) {
                throw new Error(`Could not fetch customers: ${error.message}`);
            }
        },
        getCustomer: async (_, { username }) => {
            try {
                const customer = await customers.findOne({ username });
                if (!customer) {
                    throw new Error("Customer not found");
                }
                return customer;
            }
            catch (error) {
                throw new Error(`Could not fetch customer: ${error.message}`);
            }
        },
        getTransactionsPerAccount: async (_, { accountId }) => {
            try {
                const transactionsPerAccount = await transactions.find({ account_id: accountId }).toArray();
                console.log(transactionsPerAccount);
                return transactionsPerAccount;
            }
            catch (error) {
                throw new Error(`Could not fetch transactions for account ${accountId}: ${error.message}`);
            }
        }
    },
    Customer: {
        tierAndDetails: (customer) => {
            const { tier_and_details } = customer;
            return Object.values(tier_and_details);
        }
    }
};
