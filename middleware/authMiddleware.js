const jwt = require("jsonwebtoken");
async function isAuth(req, res, next) {
  const { access_token } = req.cookies;

  try {
    if (!access_token) {
      return res
        .status(401)
        .json({ success: false, message: "You are not Authorized" });
    }
    const tokenDecode = jwt.verify(access_token, process.env.JWT_SECRET);
    if (tokenDecode.id) {
      req.userId = tokenDecode.id;
    } else {
      return res
        .status(401)
        .json({ success: false, message: "You are not authorized!" });
    }

    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

module.exports = {
  isAuth,
};
