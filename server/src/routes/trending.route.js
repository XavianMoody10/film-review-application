import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/all", async (req, res) => {
  const url = "https://api.themoviedb.org/3/trending/all/day?language=en-US";

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
    res.status(404).send("Error getting trending collection");
  }
});

export default router;
