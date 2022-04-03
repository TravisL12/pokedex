import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../../styles/PokemonList.module.scss";

type TPokemonResults = {
  count?: number;
  results: { name: string; imageUrl: string }[];
};
const LIMIT = 100;

const Pokemon: NextPage = () => {
  const [page, setPage] = useState<number>(0);
  const [pokemonList, setPokemonList] = useState<TPokemonResults>({
    results: [],
  });

  const fetchPokemon = async () => {
    const resp = await fetch(
      `/api/pokemon/list/?limit=${LIMIT}&offset=${LIMIT * page}`
    );
    const { pokemonResult } = await resp.json();
    setPokemonList(pokemonResult);
  };

  useEffect(() => {
    fetchPokemon();
  }, [page]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon!</title>
        <meta name="description" content="Pokemon for things" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>List of Pokemon</h1>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => setPage(page - 1)} disabled={page === 0}>
          Prev
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
        <span>Page: {page + 1}</span>
        <span>Total: {pokemonList?.count}</span>
      </div>
      <div className={styles["pokemon-list"]}>
        {pokemonList?.results.map((p) => {
          return (
            <Link key={p.name} href={`/pokemon/${p.name}`}>
              <div className={styles["pokemon-list__item"]}>
                <img src={p.imageUrl} />
                <span>{p.name}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Pokemon;
