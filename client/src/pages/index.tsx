import Head from "next/head";
import CustomerList from "../components/CustomerList";

export default function Home() {
  return (
    <>
      <Head>
        <title>Customers</title>
        <meta name="description" content="Customers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Customer Database</h1>
        <div>
          <CustomerList />
        </div>
      </main>
    </>
  );
}
