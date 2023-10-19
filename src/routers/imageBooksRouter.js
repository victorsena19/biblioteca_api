import express from "express";
import ImageBookController from "../controllers/imageBookController.js";

const router = express.Router();

router.get("/imagesbooks/:name/:filename", ImageBookController.getImageBook);

export default router;
