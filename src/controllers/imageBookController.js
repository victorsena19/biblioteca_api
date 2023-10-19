import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import mime from "mime";

class ImageUserController {
  static async getImageBook(req, res) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    try {
      const { name, filename } = req.params;
      const imagePath = path.join(
        __dirname,
        "..",
        "..",
        "imgBooks",
        name,
        filename
      );
      fs.access(imagePath, fs.constants.R_OK, (error) => {
        if (error) {
          return res.status(404).json({ message: "Imagem não encontrado!" });
        }

        const contentType = mime.getType(imagePath);
        if (!contentType) {
          return res
            .status(500)
            .json({ message: "Tipo de conteúdo não suportado" });
        }
        res.setHeader("Content-Type", contentType);
        res.removeHeader("Content-Disposition");
        const imageStream = fs.createReadStream(imagePath);
        imageStream.pipe(res);
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: `Erro ao tentar buscar Imagem ${error}` });
    }
  }
}

export default ImageUserController;
