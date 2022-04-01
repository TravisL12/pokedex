import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import styles from "../../styles/Home.module.css";

const Search: NextPage = () => {
  const fetchHello = async () => {
    const resp = await fetch("/api/hello");
    const data = await resp.json();
    console.log(data);
  };

  useEffect(() => {
    fetchHello();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Search!</title>
        <meta name="description" content="Search for things" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Search for things</h1>
      <ul>
        <li>
          <Link href="/search/house">Go to House</Link>
        </li>
      </ul>
    </div>
  );
};

export default Search;
