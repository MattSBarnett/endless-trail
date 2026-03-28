import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pathRouter from "./routes/pathRoute.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use("/api/path", pathRouter);

app.listen(8080, () => {
  console.log("The endless trail, running on: http://localhost:8080");
});
