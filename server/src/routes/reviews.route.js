import { Router } from "express";
import movieReviewsMockdata from "../mocks/mockdata/movieReviews.mockdata.js";

const router = Router();

router.get("/:media_type/:media_id", async (req, res) => {
  const { media_type, media_id } = req.params;

  // if (media_type === "movie") {
  //   return res.json(movieReviewsMockdata);
  // }

  return res.json([]);
});

export default router;
