import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { registerRoutes } from "./utils";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
  })
);
registerRoutes(app);
app.listen(PORT, () => {
  console.log("APP IS LISTENING ON PORT ", PORT);
});
