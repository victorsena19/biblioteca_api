import multer from "multer";
import { createDiretoy } from "../helpers/createDiretory.js";

export const title = (fildNameDiretory, fildNameFile) => {
  return multer({
    storage: createDiretoy("../../imgBooks", fildNameDiretory, fildNameFile),
  });
};

export const upload = title("title", "title");
