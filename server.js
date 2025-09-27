const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const mongoConnect = require("./config/mongoDB");
const { authRouter } = require("./route/authRouter");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");
const taskRouter = require("./route/taskRoutes");
const taskModel = require("./model/taskModel");
const { isAuth } = require("./middleware/authMiddleware");
const userModel = require("./model/userModel");
const { name } = require("ejs");

const app = express();

const PORT = process.env.PORT;
mongoConnect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());

app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/tasks", isAuth, async (req, res) => {
  try {
    const { state } = req.query;
    const filter = { user_id: req.userId };
    const user = await userModel.findById(req.userId);

    if (state === "pending" || state === "completed") {
      filter.state = state;
    }

    const tasks = await taskModel.find(filter);
    res.render("tasks", {
      tasks,
      selectedState: state || "all",
      name: user.username,
    });
  } catch (error) {
    return res.status(500).send("Server error");
  }
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/api/auth", authRouter);
app.use("/api/tasks/", taskRouter);

//swagger endpoint
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

module.exports = app;
