const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(cookieParser("combined"));

app.get("/", (req, res) => {
  res.json("Welcome API");
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
