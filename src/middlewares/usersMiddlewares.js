import multer from "multer";
import { createDiretoy } from "../helpers/createDiretory.js";

export const storage = (fildNameDiretory, fildNamefile) => {
  return multer({
    storage: createDiretoy("../../imgUsers", fildNameDiretory, fildNamefile),
  });
};

export const upload = storage("email", "name");
