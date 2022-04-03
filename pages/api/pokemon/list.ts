import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  pokemonResult: any;
};

const URL_ROOT = "https://pokeapi.co/api/v2/";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const query = req.query;
  const data = await fetch(
    `${URL_ROOT}/pokemon/?limit=${query.limit}&offset=${query.offset}`
  );
  const resp = await data.json();

  const nameReqs = resp.results.map(({ name }: { name: string }) => {
    return fetch(`${URL_ROOT}/pokemon/${name}`);
  });

  const nameResp = await Promise.all(nameReqs);
  const nameData = await Promise.all(nameResp.map((r) => r.json()));

  const results = nameData.map((d) => {
    return { name: d.name, imageUrl: d.sprites.front_shiny };
  });

  res.status(200).json({ pokemonResult: { ...resp, results } });
}
