import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/:media_type", async (req, res) => {
  const { media_type } = req.params;
  const media_type_options = ["all", "movie", "tv"];

  const url = `https://api.themoviedb.org/3/trending/${media_type}/day`;

  try {
    if (!media_type_options.includes(media_type)) {
      throw new Error(
        "'media_type' value must be either 'movie', 'tv', or 'all'",
      );
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
      return res
        .status(400)
        .json({ error: "Error getting trending collection" });
    }

    return res.status(400).json({ error: error.message });
  }
});

export default router;
