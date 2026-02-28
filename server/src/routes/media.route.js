import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/details/:media_type/:media_id", async (req, res) => {
  const { media_type, media_id } = req.params;

  const url = `https://api.themoviedb.org/3/${media_type}/${media_id}?language=en-US`;

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
    res.status(404).send("Error getting details");
  }
});

router.get("/credits/:media_type/:media_id", async (req, res) => {
  const { media_type, media_id } = req.params;

  const url = `https://api.themoviedb.org/3/${media_type}/${media_id}/credits?language=en-US`;

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
    res.status(404).send("Error getting cast");
  }
});

router.get("/images/:media_type/:media_id", async (req, res) => {
  const { media_type, media_id } = req.params;

  const url = `https://api.themoviedb.org/3/${media_type}/${media_id}/images`;

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
    res.status(404).send("Error getting images");
  }
});

export default router;
