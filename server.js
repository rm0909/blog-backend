import express from "express";
import { config } from "dotenv";
config();
import mongoose from "mongoose";
import { ServerApiVersion } from "mongodb";
import cors from "cors";
const app = express();

import postRouter from "./routes/postRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js"
const uri = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;
mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  },
  (err) => {
    err
      ? console.log("FALHA ao conectar ao mongodb!", err)
      : console.log("connectado ao mongo");
  }
);
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use("/post", postRouter)
app.use("/auth", authRouter)
app.use("/user", userRouter)
app.listen(PORT, console.log(`server rodando na porta${PORT}`));
