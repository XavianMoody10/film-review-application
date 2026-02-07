import { Router } from "express";

const router = Router();

router.get("/list/:list/:page", async (req, res) => {
  const { list, page } = req.params;

  const params = {
    language: "en-US",
    page,
  };

  const query = new URLSearchParams(params).toString();

  const url = `https://api.themoviedb.org/3/movie/${list}?${query}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.API_KEY,
    },
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    return res.status(400).send("Error getting movie collection");
  }

  const data = await response.json();

  return res.json(data);
});

router.get("/details/:movie_id", async (req, res) => {
  const { movie_id } = req.params;

  const params = {
    language: "en-US",
  };

  const query = new URLSearchParams(params).toString();

  const url = `https://api.themoviedb.org/3/movie/${movie_id}?${query}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.API_KEY,
    },
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    return res.status(400).send("Error getting media details");
  }

  const data = await response.json();

  return res.json(data);
});

export default router;
