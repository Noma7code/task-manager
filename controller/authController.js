const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Register User
async function registerUser(req, res) {
  const { username, password } = req.body;
  //check empty fields
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    //check existing user
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exist",
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create a new user
    const user = new userModel({ username, password: hashedPassword });
    //save user in database
    await user.save();

    //generate user token
    const access_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //send token as cookie
    res.cookie("access_token", access_token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

//login user
async function loginUser(req, res) {
  const { username, password } = req.body;
  //check empty fields
  if (!username || !password) {
    return res.staus(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res
        .status(401)
        .json({ success: false, message: "Password Incorrect" });
    }

    //generate user token
    const access_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //send token as cookie
    res.cookie("access_token", access_token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(200)
      .json({ success: true, message: "Login successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

//logout user
async function logoutUser(req, res) {
  try {
    res.clearCookie("access_token", process.env.JWT_SECRET, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

//delete account
async function deleteUserAccount(req, res) {
  try {
    const userId = req.user.id;
    const deletedUser = await userModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }

    res.clearCookie("access_token");
    res
      .status(200)
      .json({ sucess: true, message: "User Account deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  deleteUserAccount,
};
