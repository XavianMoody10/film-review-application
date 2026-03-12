import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/:media_type", async (req, res) => {
  const { media_type } = req.params;
  const media_type_options = ["movie", "tv"];

  const url = `https://api.themoviedb.org/3/genre/${media_type}/list`;

  try {
    if (!media_type_options.includes(media_type)) {
      throw new Error("'media_type' value must be either 'movie' or 'tv'");
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
      return res.status(400).json({
        error: `Error getting genres`,
      });
    }

    return res.status(400).json({ error: error.message });
  }
});

router.get("/discover/:media_type/:genre_id", async (req, res) => {
  const { media_type, genre_id } = req.params;
  const media_type_options = ["movie", "tv"];

  const url = `https://api.themoviedb.org/3/discover/${media_type}`;

  try {
    if (!media_type_options.includes(media_type)) {
      throw new Error("'media_type' value must be either 'movie' or 'tv'");
    }

    if (!genre_id) {
      throw new Error("'genre_id' is required");
    }

    const response = await axios.get(url, {
      headers: {
        accept: "application/json",
        Authorization: process.env.API_KEY,
      },
      params: { with_genres: genre_id },
    });

    return res.status(200).json(response.data);
  } catch (error) {
    if (error.response?.status >= 400) {
      return res.status(400).json({
        error: `Error getting collection from genre`,
      });
    }

    return res.status(400).json({ error: error.message });
  }
});

export default router;
