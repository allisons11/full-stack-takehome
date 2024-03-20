import { useQuery } from "@apollo/client";
import Transaction from "./Transaction";
import { GET_TRANSACTIONS } from "../graphql/queries";
import styles from "../styles/Account.module.css";

// types
export interface AccountProps {
  accountId: Number;
}

export interface Transaction {
  code: String;
  date: Number;
  amount: Number;
  price: Number;
  total: Number;
}

const Account = ({ accountId }: AccountProps) => {
  // fetch all transactions per current account
  const { loading, error, data } = useQuery(GET_TRANSACTIONS, {
    variables: { accountId },
  });
  if (loading) return <div>Loading</div>;
  if (error) return <div>Error fetching transactions: {error.message}</div>;
  if (!data) return <div>No transactions</div>;
  const { TransactionsPerAccount } = data;

  // create an array of transaction cards sorted by most recent
  const transactions = [...TransactionsPerAccount]
    .sort((a: Transaction, b: Transaction) => {
      return Number(b.date) - Number(a.date);
    })
    .map((transaction: Transaction, i: number) => {
      const { code, date, amount, price, total } = transaction;
      return (
        <Transaction
          key={i}
          code={code}
          date={date}
          amount={amount}
          price={price}
          total={total}
        ></Transaction>
      );
    });

  return (
    <section className={styles.accountCard}>
      <header>
        <h3>Account # {accountId.toString()}</h3>
      </header>
      <section>
        <h4>Transaction History</h4>
        <div className={styles.transactionList}>{transactions}</div>
      </section>
    </section>
  );
};

export default Account;
