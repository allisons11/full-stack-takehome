import styles from "../styles/Transaction.module.css";

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
  const readableDate = new Date(Number(date)).toUTCString();
  return (
    <div className={styles.transaction}>
      <div>Date: {readableDate}</div>
      <div>Type: {code}</div>
      <div>Amount: {amount.toString()}</div>
      <div>Price: {price.toString()}</div>
      <div>Total: {total.toString()}</div>
    </div>
  );
};

export default Transaction;
