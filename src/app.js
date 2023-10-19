import db from "./config/dbConnect.js";
import express from "express";
import routes from "./routers/index.js";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("conexão feita com sucesso");
});

routes(app);

export default app;
