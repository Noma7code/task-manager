const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  deleteUserAccount,
} = require("../controller/authController");

const authRouter = express.Router();

authRouter.post("/register-user", registerUser);
authRouter.post("/login-user", loginUser);
authRouter.post("/logout-user", logoutUser);
authRouter.delete("/delete-user-account", deleteUserAccount);

module.exports = {
  authRouter,
};
