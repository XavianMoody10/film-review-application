import { Router } from "express";
import { Media } from "../models/media.model.js";

const router = Router();

router.get("/:media_type/:media_id", async (req, res) => {
  const { media_type, media_id } = req.params;

  try {
    const doc = await Media.findOne({ media_type, media_id });

    if (!doc) {
      return res.status(200).json([]);
    }

    return res.status(200).json(doc.reviews);
  } catch (error) {
    return res.status(400).json({ error: "Error posting review" });
  }
});

router.post("/create/:media_type/:media_id", async (req, res) => {
  try {
    const { media_type, media_id } = req.params;

    const doc = await Media.findOne({ media_id, media_type });

    if (!doc) {
      const newDoc = await Media.create({
        media_id,
        media_type,
        reviews: [req.body],
      });
      return res.json(newDoc.reviews);
    }

    const newDoc = await Media.findOneAndUpdate(
      {
        media_id,
        media_type,
      },
      {
        $push: {
          reviews: req.body,
        },
      },
      { returnDocument: "after" },
    );

    return res.json(newDoc.reviews);
  } catch (error) {
    return res.status(400).json({ error: "Error posting review" });
  }
});

export default router;
