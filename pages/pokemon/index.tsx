import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../../styles/PokemonList.module.scss";

type TPokemonResults = { results: { name: string; url: string }[] };

const Pokemon: NextPage = () => {
  const [pokemonList, setPokemonList] = useState<TPokemonResults>({
    results: [],
  });
  const fetchPokemon = async () => {
    const resp = await fetch("/api/pokemon/list");
    const { pokemonResult } = await resp.json();
    console.log(pokemonResult?.results);

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
      <div className={styles["pokemon-list"]}>
        {pokemonList?.results.map((p) => {
          const id = p.url
            .split("/")
            .filter((x) => x)
            .slice(-1)[0]; // this is weird
          return (
            <Link href={`/pokemon/${p.name}`}>
              <div key={p.name} className={styles["pokemon-list__item"]}>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`}
                />
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
