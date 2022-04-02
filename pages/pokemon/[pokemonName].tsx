import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../../styles/Home.module.css";

const PokemonItem: NextPage = () => {
  const router = useRouter();
  const { pokemonName } = router.query;

  const fetchPokemon = async () => {
    const resp = await fetch(`/api/pokemon/show?name=${pokemonName}`);
    const data = await resp.json();
    console.log(data);
  };

  useEffect(() => {
    if (pokemonName) {
      fetchPokemon();
    }
  }, [pokemonName]);

  return (
    <div className={styles.container}>
      <Head>
        <title>{pokemonName} item!</title>
        <meta name="description" content="Search for things" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/pokemon">Back to Pokemon List</Link>
      <h1>{pokemonName}: All Info</h1>
    </div>
  );
};

export default PokemonItem;
