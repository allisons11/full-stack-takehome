import { gql } from "@apollo/client";

export const GET_CUSTOMERS = gql`
  query {
    Customers {
      id
      username
      name
      address
    }
  }
`;

export const GET_CUSTOMER_INFO = gql`
  query Customer($id: String!) {
    Customer(id: $id) {
      id
      username
      name
      address
      email
      accounts
      tierAndDetails {
        tier
        benefits
        active
      }
    }
  }
`;

export const GET_TRANSACTIONS = gql`
  query TransactionsPerAccount($accountId: Int!) {
    TransactionsPerAccount(accountId: $accountId) {
      date
      amount
      code
      symbol
      price
      total
    }
  }
`;
