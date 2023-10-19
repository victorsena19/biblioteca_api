import mongoose from "mongoose";
import userModel from "../models/User.js";
import bcrypt from "bcrypt";

class UserController {
  static async getUsersId(req, res) {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID Inválido!" });
      }

      const usuarioExist = await userModel.findById(id, "-pass");

      if (!usuarioExist) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }

      return res.status(200).json(usuarioExist);
    } catch (error) {
      return res
        .status(500)
        .json({ error: `Erro ao tentar fazer a busca ${error}` });
    }
  }

  static async getUsersAll(req, res) {
    try {
      const users = await userModel.find().select("-pass");
      return res.status(200).json(users);
    } catch (error) {
      return res
        .status(500)
        .json({ error: `Erro ao tentar fazer a busca ${error}` });
    }
  }

  static async postUser(req, res) {
    try {
      const { name, email, gender, pass } = req.body;

      if (!name) {
        return res.status(422).json({ message: " O Nome é obrigatório!" });
      }

      if (!email) {
        return res.status(422).json({ message: "O Email é obrigatório!" });
      }
      if (!gender) {
        return res.status(422).json({ message: "O Gênero é obrigatório!" });
      }
      if (!pass) {
        return res.status(422).json({ message: "A Senha é obrigatório!" });
      }

      const existingUserByEmail = await userModel.findOne({
        email: { $regex: new RegExp(email, "i") },
      });

      if (existingUserByEmail) {
        return res.status(400).json({ message: "Esse Email já existe!" });
      }

      const saltRounds = 12;
      const salt = await bcrypt.genSalt(saltRounds);
      const passHash = await bcrypt.hash(pass, salt);

      const newUser = await userModel.create({
        name: name.trim().toUpperCase(),
        email: email.trim().toLowerCase(),
        gender: gender.toLowerCase(),
        pass: passHash.trim(),
        imgUser: req.file ? req.file.filename : "",
      });
      return res
        .status(201)
        .json({ message: "Usuario criado com sucesso!", newUser });
    } catch (error) {
      return res
        .status(500)
        .json({ error: `Erro ao tentar cadastrar Usuario ${error}` });
    }
  }

  static async putUser(req, res) {
    try {
      const id = req.params.id;
      const updateUser = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID inválido!" });
      }

      const userExist = await userModel.findById(id);

      if (!userExist) {
        return res.status(404).send({ message: "Usuario não encontrado!" });
      }

      if (updateUser.name) {
        userExist.name = updateUser.name.toUpperCase();
      }
      if (updateUser.email) {
        userExist.email = updateUser.email.toLowerCase();
      }
      if (updateUser.gender) {
        userExist.gender = updateUser.gender.toLowerCase();
      }

      await userExist.save();
      res.status(200).json({ message: "Usuario alterado com sucesso!" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: ` Erro ao tentar alterar usuario ${error}` });
    }
  }

  static async deleteUser(req, res) {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID Inválido!" });
      }

      const usuarioExist = await userModel.findById(id);

      if (!usuarioExist) {
        return res.status(404).json({ message: "Usuario não encontrado!" });
      }

      await userModel.findByIdAndDelete(id, req.body);
      return res.status(200).json({ message: "Usuario excluido com sucesso!" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: `Erro ao tentar excluir usuario! ${error}` });
    }
  }
}

export default UserController;
