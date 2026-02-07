import { Router } from "express";
import { User } from "../models/user.model.js";
import { Review } from "../models/review.model.js";

const router = Router();

router.get("/get/:mediaId", async (req, res) => {
  const { mediaId } = req.params;

  const doc = await Review.findOne({
    mediaId,
  });

  return res.send(doc);
});

router.post("/add", async (req, res) => {
  const { _id, mediaId, review } = req.body;

  await User.findByIdAndUpdate(_id, {
    $push: {
      reviews: {
        mediaId,
        review,
      },
    },
  });

  const ifDocExist = await Review.exists({
    mediaId,
  });

  if (!ifDocExist) {
    const doc = await Review.create({
      mediaId,
      reviews: [{ userId: _id, review }],
    });

    return res.send(doc);
  }

  const ifReviewExist = await Review.exists({
    mediaId,
    "reviews.userId": _id,
  });

  if (ifReviewExist) {
    return res.status(400).send("User already reviewed");
  }

  const doc = await Review.findOneAndUpdate(
    {
      mediaId,
    },
    { $push: { reviews: { userId: _id, review } } },
    { new: true },
  );

  return res.send(doc);
});

export default router;
