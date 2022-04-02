import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";

const PokemonItem: NextPage = () => {
  const [pokemonInfo, setPokemonInfo] = useState<any>();
  const router = useRouter();
  const { pokemonName } = router.query;

  const fetchPokemon = async () => {
    const resp = await fetch(`/api/pokemon/show?name=${pokemonName}`);
    const { pokemonResult } = await resp.json();
    setPokemonInfo(pokemonResult);
  };

  useEffect(() => {
    if (pokemonName) {
      fetchPokemon();
    }
  }, [pokemonName]);

  if (!pokemonInfo) {
    return <h1>Loading...</h1>;
  }

  console.log(pokemonInfo, "pokemonInfo");

  return (
    <div className={styles.container}>
      <Head>
        <title>{pokemonName} item!</title>
        <meta name="description" content="Search for things" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/pokemon">Back to Pokemon List</Link>
      <h1>{pokemonName}: All Info</h1>
      <div>
        <strong>Stats</strong>
        <ul>
          {pokemonInfo?.stats.map((stat: any) => (
            <li key={stat.stat.name}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <strong>Moves</strong>
        <ul>
          {pokemonInfo?.moves.map((move: any) => (
            <li key={move.move.name}>{move.move.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonItem;
