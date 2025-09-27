const jwt = require("jsonwebtoken");
async function isAuth(req, res, next) {
  const { access_token } = req.cookies;

  try {
    if (!access_token) {
      return res
        .status(401)
        .json({ success: false, message: "You are not authorized" });
    }
    const tokenDecode = jwt.verify(access_token, process.env.JWT_SECRET);
    if (tokenDecode?.id) {
      req.userId = tokenDecode.id;
      return next();
    }

    return res.status(401).json({ success: false, message: "Invalid token" });
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Token verification failed" });
  }
}

module.exports = { isAuth };
