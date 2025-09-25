const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const mongoConnect = require("./config/mongoDB");
const { authRouter } = require("./route/authRouter");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");

const app = express();

const PORT = process.env.PORT;
mongoConnect();

app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json("Welcome to taskManager API");
});

app.use("/api/auth", authRouter);

//swagger endpoint
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
