import styles from "../styles/CustomerList.module.css";

interface CustomerSummaryProps {
  name: string;
  username: string;
  address: string;
}

const CustomerSummary = ({ name, username, address }: CustomerSummaryProps) => {
  return (
    <>
      <td className={styles.tableCell}>{name}</td>
      <td className={styles.tableCell}>{username}</td>
      <td className={styles.tableCell}>{address}</td>
    </>
  );
};

export default CustomerSummary;
