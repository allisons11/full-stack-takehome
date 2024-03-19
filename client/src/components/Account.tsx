import { useQuery } from "@apollo/client";
import Transaction from "./Transaction";
import { GET_TRANSACTIONS } from "@/graphql/queries";

interface AccountProps {
  accountId: Number;
}

interface Transaction {
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
    <div>
      <div>Account # {accountId.toString()}</div>
      <div>{transactions}</div>
    </div>
  );
};

export default Account;
