import styles from "../styles/Transaction.module.css";

// types
export interface TransactionProps {
  code: String;
  date: Number;
  amount: Number;
  price: Number;
  total: Number;
}

const Transaction = ({
  code,
  date,
  amount,
  price,
  total,
}: TransactionProps) => {
  // convert mongodb date format to readable string
  const readableDate = new Date(Number(date)).toUTCString();
  return (
    <section className={styles.transaction}>
      <p>Date: {readableDate}</p>
      <p>Type: {code}</p>
      <p>Amount: {amount.toFixed(2).toString()}</p>
      <p>Price: {price.toFixed(2).toString()}</p>
      <p>Total: {total.toFixed(2).toString()}</p>
    </section>
  );
};

export default Transaction;
