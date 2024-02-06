import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { registerRoutes } from "./utils";
import path from "path";
import { getTransit } from "./utils/get-transit";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.static(path.join(__dirname, "../static")));
registerRoutes(app);
getTransit();
app.listen(PORT, () => {
  console.log("APP IS LISTENING ON PORT ", PORT);
});
