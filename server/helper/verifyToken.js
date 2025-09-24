const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    console.log("cookies",req.cookies)
    const token = req.cookies.token;
    console.log("verifyToken",token)

    if (!token) {
      return res.json({
        success: false,
        message: "Please Login",
      });
    }

    const data = await jwt.verify(token, process.env.SECRET);
    console.log(data)
    req.worker = data; 

    next();
  } catch (err) {
    return res.json({
      success: false,
      message: "Invalid or Expired Token",
    });
  }
};

module.exports = verifyToken;
