const jwt = require("jsonwebtoken");
const User = require("../../models/User.model");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", ""); //we pass  this header in jwt verify method.
    // console.log(token);
    const verified = jwt.verify(token, "SECRETKEY");
    // console.log(verified);
    const user = await User.findOne({ _id: verified._id, authToken: token });

    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.user.authToken = user.authToken;
    next();
  } catch (error) {
    res.status(401).send({ error: "User not authenticated!" });
  }
};

module.exports = auth;
