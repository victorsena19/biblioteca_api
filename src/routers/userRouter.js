import express from "express";
import UserController from "../controllers/usersController.js";
import { checkToken } from "../middlewares/authMiddlewares.js";
import { upload } from "../middlewares/usersMiddlewares.js";

const router = express.Router();

router
  .get("/users/:id", checkToken, UserController.getUsersId)
  .get("/users", UserController.getUsersAll)
  .post("/users", upload.single("imgUser"), UserController.postUser)
  .put("/users/:id", UserController.putUser)
  .delete("/users/:id", UserController.deleteUser);

export default router;
