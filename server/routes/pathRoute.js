import express from "express";
import { planRoute } from "../service/pathService.js";
import { createLogger } from '../config/logger.js'
const logger = createLogger('pathRoute')

const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const { start, end } = req.query;
    const route = await planRoute(start, end);
    logger.info(`Returning path [${start}] -> [${end}]`);
    res.json(route);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
