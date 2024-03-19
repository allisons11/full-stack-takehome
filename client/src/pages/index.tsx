import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { gql } from "@apollo/client";
import createApolloClient from "../apollo-client";

import CustomerList from "../components/CustomerList";

const inter = Inter({ subsets: ["latin"] });

interface Customer {
  username: string,
  name: string,
  address: string
}

interface CustomerListProps {
  customers: Customer[]
}

export default function Home({ customers }: CustomerListProps) {
  console.log('customers', customers)
  return (
    <>
      <Head>
        <title>Customers</title>
        <meta name="description" content="Customers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h1>Customer Database</h1>
        <div className={styles.description}>
          <CustomerList customers={customers}> </CustomerList>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const client = createApolloClient();
  const { data } = await client.query({
    query: gql`
      query {
        Customers {
          username
          name
          address
        }
      }
    `,
  });

  return {
    props: {
      customers: data.Customers,
    },
  };
}
