import express from "express";
import ImageUserController from "../controllers/imageUserController.js";

const router = express.Router();

router.get("/imagesusers/:email/:filename", ImageUserController.getImageUser);

export default router;
