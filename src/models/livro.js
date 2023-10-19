import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: { type: String, require: true },
  author: { type: String, require: true },
  publisher: { type: String, require: true },
  numPag: { type: Number, require: true },
  imgBook: { type: String, require: true },
});

const bookModel = mongoose.model("livros", BookSchema);

export default bookModel;
