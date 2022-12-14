import adminModel from "../models/Admin.js";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {registerValidate, loginValidate } from "../controllers/validate.js";
import mongoose from "mongoose";
import { config } from "dotenv";

config();
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;
const secret = process.env.TOKEN_SECRET;
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  //validar com Joi
  const { error } = registerValidate(req.body);
  if (error) return res.status(400).json(error.message);
  //se passar na validação, buscar se email está em uso
  const selectedUser = await adminModel.findOne({ email: req.body.email });
  if (selectedUser) return res.status(400).json("Email em uso");
  // criar novo user
  const user = new adminModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    //cryptografar a senha do usuário para não ser exposta
    password: bcrypt.hashSync(req.body.password),
  });
  try {
    //salvar na db e retornar ao front
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

userRouter.post("/login", async (req, res) => {
  //validar com Joi
  const { error } = loginValidate(req.body);
  if (error) return res.status(400).json(error.message);
  // buscar por email
  if (req.body.email !== adminEmail || req.body.password !== adminPassword) {
    return res.status(400).send("USUARIO NÃO É PERMITIDO");
  }
  const selectedUser = await adminModel.findOne({ email: req.body.email });
  
  if (!selectedUser) return res.status(400).json("Email não encontrado!");
  //checar se a senha bate
  const passWordMatch = bcrypt.compareSync(
    req.body.password,
    selectedUser.password
  );
  if (!passWordMatch) return res.status(400).json("Email ou senha incorreto!");
  //criar token com info do user
  const token = jwt.sign(
    {
      _id: selectedUser._id,
      name: selectedUser.name,
      email: selectedUser.email,
    },
    secret,
    { expiresIn: "1d" }
  );
  //criar header com token
  res.set("authorization-token", token);
  res.status(200).json({ message: "Usuário logado com sucesso", token: token });
});

export default userRouter;
