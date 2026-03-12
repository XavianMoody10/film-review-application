import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/:media_type/:list_value", async (req, res) => {
  const { media_type, list_value } = req.params;
  const media_type_options = ["all", "movie", "tv"];
  const list_value_movie_options = [
    "now_playing",
    "popular",
    "top_rated",
    "upcoming",
  ];
  const list_value_tv_options = [
    "now_playing",
    "popular",
    "top_rated",
    "upcoming",
  ];

  const url = `https://api.themoviedb.org/3/${media_type}/${list_value}`;

  try {
    if (!media_type_options.includes(media_type)) {
      throw new Error(
        "'media_type' value must be either 'movie', 'tv', or 'all'",
      );
    }

    if (
      !list_value_movie_options.includes(list_value) &&
      list_value_tv_options.includes(list_value)
    ) {
      throw new Error("'list_value' value must be a valid");
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
        error: `Error getting list collection for  ${list_value}`,
      });
    }

    return res.status(400).json({ error: error.message });
  }
});

export default router;
