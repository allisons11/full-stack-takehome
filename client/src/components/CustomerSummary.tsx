import { useRouter } from "next/router";
import styles from "../styles/CustomerSummary.module.css";

interface CustomerSummaryProps {
  name: string;
  username: string;
  address: string;
  id: string;
}

const CustomerSummary = ({
  name,
  username,
  address,
  id,
}: CustomerSummaryProps) => {
  const router = useRouter();

  return (
    <>
      <td className={styles.tableCell}>{name}</td>
      <td className={styles.tableCell}>{username}</td>
      <td className={styles.tableCell}>{address}</td>
      <td className={styles.tableCell}>
        <button onClick={() => router.push(`/customer/${id}`)}>Expand</button>
      </td>
    </>
  );
};

export default CustomerSummary;
