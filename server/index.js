const express = require("express");
const cors = require("cors");
const pathRouter = require("./routes/pathRoute");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use("/api/path", pathRouter);

app.listen(8080, () => {
  console.log("The endless trail, running on: http://localhost:8080");
});
