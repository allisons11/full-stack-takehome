import CustomerSummary from "./CustomerSummary";
import styles from "../styles/CustomerList.module.css";

interface Customer {
  username: string;
  name: string;
  address: string;
}

interface CustomerListProps {
  customers: Customer[];
}

const CustomerList = ({ customers }: CustomerListProps) => {
  const summaries = customers.map((customer, i: number) => (
    <tr key={i}>
      <CustomerSummary {...customer} />
    </tr>
  ));

  return (
    <div className={styles.customerList}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.headerCell}>Name</th>
            <th className={styles.headerCell}>Username</th>
            <th className={styles.headerCell}>Address</th>
          </tr>
        </thead>
        <tbody>{summaries}</tbody>
      </table>
    </div>
  );
};

export default CustomerList;
