import express from "express";
import BookController from "../controllers/livrosController.js";
import { upload } from "../middlewares/bookMiddlewares.js";

const router = express.Router();

router
  .get("/livros/:id", BookController.getBookId)
  .get("/livros", BookController.getBooksAll)
  .post("/livros", upload.single("imgBook"), BookController.postBook)
  .put("/livros/:id", upload.single("imgBook"), BookController.putBook)
  .delete("/livros/:id", BookController.deleteBook);

export default router;
