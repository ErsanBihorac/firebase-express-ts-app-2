import express from "express";
import {
  uploadImage,
  deleteImage,
  getImage,
} from "../controllers/uploadController";
import { upload } from "../middlewares";

const router = express.Router();

router.post("/images", upload.single("file"), uploadImage);
router.delete("/images/:id", deleteImage);
router.get("/images/:id", getImage);

export default router;
