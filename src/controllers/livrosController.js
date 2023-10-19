import mongoose from "mongoose";
import bookModel from "../models/livro.js";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import fs from "fs";

class BookController {
  static async getBookId(req, res) {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID Inválido!" });
      }

      const bookIdExist = await bookModel.findById(id);

      if (!bookIdExist) {
        return res.status(404).json({ message: "Livro não encontrado!" });
      }

      const bookId = await bookModel.findById(id, req.body);
      return res.status(200).json(bookId);
    } catch (error) {
      return res
        .status(400)
        .json({ error: `Algo deu errado na sua busca: ${error}` });
    }
  }

  static async getBooksAll(req, res) {
    try {
      const bookList = await bookModel.find();
      return res.status(200).json(bookList);
    } catch (error) {
      return res
        .status(500)
        .json({ error: `Algo deu errado na sua busca: ${error}` });
    }
  }

  static async postBook(req, res) {
    try {
      const { title, author, publisher, numPag } = req.body;

      const existBookByTitle = await bookModel.findOne({
        title: { $regex: new RegExp(title, "i") },
      });

      if (existBookByTitle) {
        if (
          existBookByTitle.title.localeCompare(title, undefined, {
            sensitivity: "base",
          }) === 0
        ) {
          return res.status(400).json({ message: "Esse Livro já existe!" });
        }
      }

      const newBook = await bookModel.create({
        title: title.trim().toUpperCase(),
        author: author.trim().toUpperCase(),
        publisher: publisher.trim().toUpperCase(),
        numPag: numPag.trim(),
        imgBook: req.file.filename,
      });
      return res
        .status(201)
        .json({ message: `Livro criado com Sucesso!`, newBook });
    } catch (error) {
      return res
        .status(500)
        .json({ error: `Erro ao cadastrar livro, ${error}` });
    }
  }

  static async putBook(req, res) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID Inválido!" });
      }

      const bookExist = await bookModel.findById(id);
      if (!bookExist) {
        return res.status(404).json({ message: "Livro não encontrado!" });
      }

      if (req.body.title !== bookExist.title) {
        const newTitle = req.body.title;
        const newTitleNoSpaces = newTitle.replace(/\s+/g, "");
        const newDirectory = path.join(
          __dirname,
          "../../imgBooks",
          newTitleNoSpaces
        );

        if (!fs.existsSync(newDirectory)) {
          fs.mkdirSync(newDirectory, { recursive: true });
        }

        fs.renameSync(
          path.join(
            __dirname,
            "../../imgBooks",
            bookExist.title.replace(/\s+/g, ""),
            bookExist.imgBook
          ),
          path.join(newDirectory, req.body.imgBook)
        );

        bookExist.title = newTitle;
        bookExist.imgBook = req.body.imgBook;
      }

      bookExist.author = req.body.author;
      bookExist.publisher = req.body.publisher;
      bookExist.numPag = req.body.numPag;

      await bookExist.save();

      return res.status(200).send({ message: "Livro atualizado com sucesso" });
    } catch (error) {
      return res
        .status(500)
        .send({ error: `Erro ao atualizar livro, ${error}` });
    }
  }

  static async deleteBook(req, res) {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID Inválido!" });
      }

      const bookExist = await bookModel.findById(id);

      if (!bookExist) {
        return res.status(404).json({ message: "Livro não encontrado!" });
      }

      await bookModel.findByIdAndDelete(id, req.body);

      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      const directoryToDelete = path.join(
        __dirname,
        "../../imgBooks",
        bookExist.title.replace(/\s+/g, "")
      );

      if (fs.existsSync(directoryToDelete)) {
        fs.rmSync(directoryToDelete, { recursive: true });
      }
      return res.status(200).send({ message: "Livro excluido com sucesso" });
    } catch (error) {
      return res
        .status(500)
        .send({ error: `Erro ao tentar excluir livro ${error}` });
    }
  }
}

export default BookController;
