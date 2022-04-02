// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  pokemonResult: any;
};

const URL_ROOT = "https://pokeapi.co/api/v2/";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = req.query;
  const data = await fetch(`${URL_ROOT}/pokemon/${body.name}`);
  const resp = await data.json();
  res.status(200).json({ pokemonResult: resp });
}
