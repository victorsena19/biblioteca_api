import userModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class AuthController {
  static async login(req, res) {
    const { email, pass } = req.body;

    if (!email) {
      return res.status(422).json({ message: "O campo Email é obrigatório!" });
    }
    if (!pass) {
      return res.status(422).json({ message: "O campo Senha é obrigatório!" });
    }

    const user = await userModel
      .findOne({
        email: { $regex: new RegExp(email, "i") },
      })
      .select("+pass");

    if (!user) {
      return res.status(404).json({ message: "Email não encontrado!" });
    }

    const checkPass = await bcrypt.compare(pass, user.pass);

    if (!checkPass) {
      return res.status(404).json({ message: "Senha invalida!" });
    }

    try {
      const secret = process.env.SECRET;
      const token = jwt.sign(
        {
          id: user._id,
          name: user.name,
        },
        secret
      );
      user.pass = undefined;

      return res
        .status(200)
        .json({ message: "Autenticação realizada com sucesso!", token, user });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Erro ao autenticar usuario! ${error}` });
    }
  }
}

export default AuthController;
