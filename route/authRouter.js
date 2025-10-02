const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  deleteUserAccount,
} = require("../controller/authController");
const { isAuth } = require("../middleware/authMiddleware");

const authRouter = express.Router();

authRouter.post("/register-user", registerUser);
authRouter.post("/login-user", loginUser);
authRouter.post("/logout-user", isAuth, logoutUser);
authRouter.delete("/delete-user-account", isAuth, deleteUserAccount);

module.exports = {
  authRouter,
};
