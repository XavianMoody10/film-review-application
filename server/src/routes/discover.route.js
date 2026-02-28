import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/:media_type/:with_genre/:page", async (req, res) => {
  const { media_type, with_genre, page } = req.params;

  const url = `https://api.themoviedb.org/3/discover/${media_type}?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${with_genre}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.API_KEY,
    },
  };

  try {
    const response = await axios.get(url, options);
    const data = await response.data;
    return res.json(data);
  } catch (error) {
    res.status(404).send("Error getting genres");
  }
});

export default router;
