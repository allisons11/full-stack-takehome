import { useQuery } from "@apollo/client";
import CustomerSummary from "./CustomerSummary";
import { GET_CUSTOMERS } from "@/graphql/queries";
import styles from "../styles/CustomerList.module.css";

interface Customer {
  id: string;
  username: string;
  name: string;
  address: string;
}

const CustomerList = () => {
  const { loading, error, data } = useQuery(GET_CUSTOMERS);

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error fetching customer data: {error.message}</div>;
  if (!data) return <div>No data available</div>;

  const { Customers } = data;

  const summaries = Customers.map((customer: Customer, i: number) => (
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
