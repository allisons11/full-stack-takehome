import { useQuery } from "@apollo/client";
import Transaction from "./Transaction";
import { GET_TRANSACTIONS } from "../graphql/queries";
import styles from "../styles/Account.module.css";

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
  const { loading, error, data } = useQuery(GET_TRANSACTIONS, {
    variables: { accountId },
  });
  if (loading) return <div>Loading</div>;
  if (error) return <div>Error fetching account data: {error.message}</div>;
  if (!data) return <div>No data available</div>;
  const { TransactionsPerAccount } = data;

  const transactions = [...TransactionsPerAccount]
    .sort((a: Transaction, b: Transaction) => {
      return Number(a.date) - Number(b.date);
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
    <article className={styles.accountCard}>
      <header>
        <h3>Account # {accountId.toString()}</h3>
      </header>
      <section>
        <h4>Transaction History</h4>
        {transactions}
      </section>
    </article>
  );
};

export default Account;
