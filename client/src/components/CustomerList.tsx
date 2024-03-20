import { useQuery } from "@apollo/client";
import { GET_CUSTOMERS } from "@/graphql/queries";
import CustomerSummary from "./CustomerSummary";
import styles from "../styles/CustomerList.module.css";

// types
export interface Customer {
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

  // create CustomerSummary components sorted alphabetically by name
  const summaries = [...Customers]
    .sort((a: Customer, b: Customer) => {
      return a.name.localeCompare(b.name);
    })
    .map((customer: Customer, i: number) => (
      <tr key={i}>
        <CustomerSummary {...customer} />
      </tr>
    ));

  return (
    <article className={styles.customerList}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.headerCell}>Name</th>
            <th className={styles.headerCell}>Username</th>
            <th className={styles.headerCell}>Address</th>
            <th className={styles.headerCell}></th>
          </tr>
        </thead>
        <tbody>{summaries}</tbody>
      </table>
    </article>
  );
};

export default CustomerList;
