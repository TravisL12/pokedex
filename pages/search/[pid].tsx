import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";

const SearchId: NextPage = () => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <div className={styles.container}>
      <Head>
        <title>{pid} item!</title>
        <meta name="description" content="Search for things" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Search for things {pid}</h1>
    </div>
  );
};

export default SearchId;
