import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/:query", async (req, res) => {
  const { query } = req.params;
  const url = "https://api.themoviedb.org/3/search/multi";
  try {
    const response = await axios.get(url, {
      headers: {
        accept: "application/json",
        Authorization: process.env.API_KEY,
      },
      params: { query },
    });

    return res.json(response.data);
  } catch (error) {
    res.status(404).json({ error: "Error searching for results" });
  }
});

export default router;
