import app from "./src/app.js";

import dotend from "dotenv";

dotend.config();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Iniciou a porta ${port}`);
});
