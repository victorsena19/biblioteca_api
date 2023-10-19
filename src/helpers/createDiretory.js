import multer from "multer";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createDiretoy = (basePath, fildNameDiretory, fildNamefile) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const nameDiretory = req.body[fildNameDiretory];
      if (nameDiretory) {
        const nameDiretoryNoSpaces = nameDiretory.replace(/\s+/g, "");
        const diretory = path.join(__dirname, basePath, nameDiretoryNoSpaces);
        fs.mkdirSync(diretory, { recursive: true });
        cb(null, diretory);
      } else {
        const diretory = path.join(__dirname, basePath, "");
        fs.mkdirSync(diretory, { recursive: true });
        cb(null, diretory);
      }
    },
    filename: (req, file, cb) => {
      const nameFile = req.body[fildNamefile];
      if (nameFile) {
        const nameFileNoSpaces = nameFile.replace(/\s+/g, "");
        const nameExtension = path.extname(file.originalname);
        const fileName = `${nameFileNoSpaces}${nameExtension}`;
        cb(null, fileName);
      } else {
        const fileExtension = `${path.extname(file.originalname)}`;
        const defaultFileName = `default${fileExtension}`;
        cb(null, defaultFileName);
      }
    },
  });
};
