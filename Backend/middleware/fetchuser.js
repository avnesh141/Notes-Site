const jwt = require("jsonwebtoken");
const JWT_SECRET = "AvneshKumarsSecretString";
const fetchuser =  (req, res, next) => {
  try {
    const token = req.header('auth-token');
      const data=jwt.verify(JSON.parse(token), JWT_SECRET);
    req.user = data.user;
    next();
    if (!token) {
      return res.status(401).send({ error: "Authentication Denied" });
      }
  } catch (error) {
    res.status(401).send({ error });
  }
};

module.exports = fetchuser;
