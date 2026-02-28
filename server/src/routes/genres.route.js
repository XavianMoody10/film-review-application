import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/:media_type", async (req, res) => {
  const { media_type } = req.params;

  const url = `https://api.themoviedb.org/3/genre/${media_type}/list?language=en`;

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
