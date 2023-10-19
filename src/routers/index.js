import express from "express";

import livroRouter from "./livroRouter.js";
import userRouter from "./userRouter.js";
import authRouter from "./authRouter.js";
import imageUsersRouter from "./imageUsersRouter.js";
import imageBooksRouter from "./imageBooksRouter.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send("curso de Node");
  });

  app.use(express.json(), livroRouter);
  app.use(express.json(), userRouter);
  app.use(express.json(), authRouter);
  app.use(express.json(), imageUsersRouter);
  app.use(express.json(), imageBooksRouter);
};

export default routes;
