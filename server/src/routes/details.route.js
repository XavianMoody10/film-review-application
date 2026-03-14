import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/:media_type", async (req, res) => {
  const { media_type } = req.params;
  const { series_id, movie_id } = req.query;
  const media_type_options = ["all", "movie", "tv"];

  let url = "";

  try {
    if (!media_type_options.includes(media_type)) {
      throw new Error(
        "'media_type' value must be either 'movie', 'tv', or 'all'",
      );
    }

    if (series_id) {
      url = `https://api.themoviedb.org/3/${media_type}/${series_id}`;
    }

    if (movie_id) {
      url = `https://api.themoviedb.org/3/${media_type}/${movie_id}`;
    }

    if (!series_id && !movie_id) {
      throw new Error("'series_id' and 'movie_id' values are both undefined");
    }

    const response = await axios.get(url, {
      headers: {
        accept: "application/json",
        Authorization: process.env.API_KEY,
      },
    });

    return res.status(200).json(response.data);
  } catch (error) {
    if (error.response?.status >= 400) {
      return res.status(400).json({ error: "Error getting media details" });
    }

    return res.status(400).json({ error: error.message });
  }
});

export default router;
