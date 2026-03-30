import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pathRouter from "./routes/pathRoute.js";
import campsiteRouter from "./routes/campsiteRoute.js";
import rateLimit from "express-rate-limit";
import { createLogger } from "./config/logger.js";
const logger = createLogger("index");

dotenv.config();

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests, please try again later" },
});

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(rateLimiter);
app.use("/api/path", pathRouter);
app.use("/api/campsite", campsiteRouter);

app.listen(8080, () => {
  logger.info("Running on http://localhost:8080");
});
