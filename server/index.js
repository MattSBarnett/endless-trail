import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pathRouter from "./routes/pathRoute.js";
import campsiteRouter from "./routes/campsiteRoute.js";
import rateLimit from "express-rate-limit";
import { createLogger } from "./config/logger.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const logger = createLogger("index");

dotenv.config();

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: { error: "Too many requests, please try again later" },
});

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(rateLimiter);
app.use("/api/path", pathRouter);
app.use("/api/campsite", campsiteRouter);

app.use(express.static(join(__dirname, "../client/dist")));

app.get("/{*splat}", (req, res) => {
  res.sendFile(join(__dirname, "../client/dist", "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  logger.info(`Running on port: ${PORT}`);
});
