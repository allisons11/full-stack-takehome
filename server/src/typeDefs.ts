export const typeDefs = `#graphql
  type Customer {
    id: Int,
    username: String,
    name: String,
    address: String,
    email: String,
    accounts: [Int],
    tierAndDetails: [TierDetails]
  }

  type Account {
    account_id: Int,
    limit: Int,
    products: [String]
  }

  type TransactionsPerAccount {
    accountId: Int,
    transactionCount: Int,
    transactions: [Transaction]

  }

  type Transaction {
    date: Float,
    amount: Int,
    transactionCode: String,
    symbol: String,
    price: Float,
    total: Float
  }

  type TierDetails {
    tier: String,
    benefits: [String],
    active: Boolean,
    id: String
  }

  type Query {
    Customers: [Customer],
    Customer(username: String!): Customer,
    TransactionsPerAccount(accountId: Int!): [TransactionsPerAccount],
  }
`;

export default typeDefs;