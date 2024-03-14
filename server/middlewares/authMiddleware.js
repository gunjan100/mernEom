const JWT = require('jsonwebtoken');
const User = require('../models/User');


// Protect Routes token base
const requireSignIn = async (req, resp, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return resp.status(401).json({ success: false, msg: "Unauthorized: Token is not provided" });
  }
  
  console.log(token);

  try {
    const jwtToken = token.replace("Bearer ", "");
    const isVerified = JWT.verify(jwtToken, process.env.SECRET_KEY);

    const userData = await User.findOne({ uemail: isVerified.email }).select({
      uPass: 0,
    });

    if (!userData) {
      return resp.status(404).json({ success: false, msg: "User not found" });
    }

    req.user = userData;
    req.token = token;
    req.userId = userData._id;
    next();
  } catch (error) {
    console.log(error);
    return resp.status(403).json({ success: false, msg: "Unauthorized: Invalid token" });
  }
};



module.exports = {requireSignIn }