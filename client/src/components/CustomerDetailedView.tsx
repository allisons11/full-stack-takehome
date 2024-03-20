import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { GET_CUSTOMER_INFO } from "@/graphql/queries";
import Account from "./Account";
import styles from "../styles/CustomerDetailedView.module.css";

// types
export interface Tier {
  tier: String;
  benefits: String[];
  active: Boolean;
}

const CustomerDetailedView = () => {
  const router = useRouter();
  const { id } = router.query;

  // fetch customer data
  const { loading, error, data } = useQuery(GET_CUSTOMER_INFO, {
    variables: { id },
    skip: !id,
  });
  if (loading) return <div>Loading</div>;
  if (error) return <div>Error fetching customer data: {error.message}</div>;
  if (!data) return <div>No data available</div>;

  const { username, name, address, email, accounts, tierAndDetails } =
    data.Customer;

  // create an array of cards for each account
  const accountCards = accounts.map((account: number) => {
    return <Account key={account} accountId={account}></Account>;
  });

  // create an array of tiers the customer belongs to
  const customerTiers = tierAndDetails.map(
    ({ tier, benefits, active }: Tier, i: number) => {
      const benefitsList = benefits.map((benefit, i: number) => {
        return <li>{benefit}</li>;
      });
      return (
        <div className={styles.tierCard} key={i}>
          <section
            className={styles.benefitText}
          >{`${tier}: ${active ? "Active" : "Inactive"}`}</section>
          <section className={styles.benefitCard}>
            <header className={styles.benefitText}>Benefits:</header>
            <ul className={styles.benefitsItems}>{benefitsList}</ul>
          </section>
        </div>
      );
    },
  );

  return (
    <main className={styles.mainContainer}>
      <section className={styles.personalInfo}>
        <h1>{name}</h1>
        <div className={styles.username}>{username}</div>
        <br></br>
        <div className={styles.infoBlurb}>
          <div className={styles.label}>Email: </div>
          {email}
        </div>
        <div>
          <div className={styles.label}>Mailing Address: </div>
          {address}
        </div>
      </section>
      <section className={styles.tierDisplay}>
        <h2>Member Tiers</h2>
        {customerTiers.length ? (
          <div className={styles.tierCards}>{customerTiers}</div>
        ) : (
          <div>N/A</div>
        )}
      </section>
      <section className={styles.accountsDisplay}>
        <h2>Accounts:</h2>
        <br />
        {accountCards}
      </section>
    </main>
  );
};

export default CustomerDetailedView;
