import express from "express";
import { searchCampsites } from "../service/campsiteService.js";
import { createLogger } from "../config/logger.js";
const logger = createLogger("camsiteRoute");

const router = express.Router();

router.get("/search", async (req, res) => {
  const { lat, lon } = req.query;
  logger.info("Searching for campsite");
  const campsites = await searchCampsites(lat, lon);
  res.json(campsites);
});

export default router;
