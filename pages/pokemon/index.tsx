import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";

type TPokemonResults = { results: { name: string; url: string }[] };

const Pokemon: NextPage = () => {
  const [pokemonList, setPokemonList] = useState<TPokemonResults>({
    results: [],
  });
  const fetchPokemon = async () => {
    const resp = await fetch("/api/pokemon/list");
    const { pokemonResult } = await resp.json();
    setPokemonList(pokemonResult);
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon!</title>
        <meta name="description" content="Pokemon for things" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>List of Pokemon</h1>
      <ul>
        {pokemonList?.results.map((p) => (
          <li key={p.name}>
            <Link href={`/pokemon/${p.name}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pokemon;
