import express from "express";
import AuthControllerController from "../controllers/authController.js";

const router = express.Router();

router.post("/auth/login", AuthControllerController.login);

export default router;
