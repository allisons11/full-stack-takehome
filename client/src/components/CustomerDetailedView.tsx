import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Account from "./Account";
import { GET_CUSTOMER_INFO } from "@/graphql/queries";
import styles from "../styles/CustomerDetailedView.module.css";

interface Tier {
  tier: String;
  benefits: String[];
  active: Boolean;
}

const CustomerDetailedView = () => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery(GET_CUSTOMER_INFO, {
    variables: { id },
    skip: !id,
  });
  if (loading) return <div>Loading</div>;
  if (error) return <div>Error fetching customer data: {error.message}</div>;
  if (!data) return <div>No data available</div>;
  const { username, name, address, email, accounts, tierAndDetails } =
    data.Customer;

  const accountCards = accounts.map((account: number) => {
    return <Account key={account} accountId={account}></Account>;
  });

  const customerTiers = tierAndDetails.map(
    ({ tier, benefits, active }: Tier, i: number) => {
      const benefitsList = benefits.map((benefit, i: number) => {
        return <li>{benefit}</li>;
      });
      return (
        <div className={styles.tierCard} key={i}>
          <section>{tier}</section>
          <section>Active: {active.toString()}</section>
          <section className={styles.benefitCard}>
            <header className={styles.benefitHeader}>Benefits:</header>
            <ul className={styles.benefitsItems}>{benefitsList}</ul>
          </section>
        </div>
      );
    },
  );

  return (
    <main className={styles.mainContainer}>
      <div className={styles.personalInfo}>
        <h1>{name}</h1>
        <div>{username}</div>
        <br></br>
        <div>Email: {email}</div>
        <div>Address: {address}</div>
        <div>Birth date: </div>
      </div>
      <div className={styles.tierDisplay}>
        <h2>Member Tiers</h2>
        {customerTiers}
      </div>
      <div className={styles.accountsDisplay}>
        <h2>Accounts:</h2>
        <br />
        {accountCards}
      </div>
    </main>
  );
};

export default CustomerDetailedView;
