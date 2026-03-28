const express = require("express");
const router = express.Router();
const { planRoute } = require("../service/pathService").default;

router.get("/search", async (req, res) => {
  try {
    const { start, end } = req.query;
    const route = await planRoute(start, end);
    res.json(route);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
