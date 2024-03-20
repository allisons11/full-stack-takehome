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
      <p className={styles.transactionLine}>Date: {readableDate}</p>
      <p className={styles.transactionLine}>Type: {code}</p>
      <p className={styles.transactionLine}>
        Amount: {amount.toFixed(2).toString()}
      </p>
      <p className={styles.transactionLine}>
        Price: {price.toFixed(2).toString()}
      </p>
      <p className={styles.transactionLine}>
        Total: {total.toFixed(2).toString()}
      </p>
    </section>
  );
};

export default Transaction;
