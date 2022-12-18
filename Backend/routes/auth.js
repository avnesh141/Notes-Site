const { body, validationResult } = require("express-validator");

const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "AvneshKumarsSecretString";
const fetchuser = require('../middleware/fetchuser');

//Route #1;    CREATE USER

router.post(
  "/createuser",
  body("name", "Must be three characters long").isLength({ min: 3 }),
  body("email", "must be a valid email").isEmail(),
  body("password", "must be 5 characters long").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry A user with this email is already exist" });
      } else {
        const password = req.body.password;
        const salt = await bcryptjs.genSalt(10);
        const secPass = bcryptjs.hashSync(password, salt);
        user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass,
        });
        const data = {
          user: {
            id: user.id,
          },
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some Error Occurred");
    }
  }
);


//Route  #2     USER LOGIN
var login = false;
var id = null;
router.post(
  "/login",
  body("email", "Please enter valiid Credentials").isEmail(),
  body("password", "Password must not be empty").isLength({min:1}),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({error:"Enter valid Credentials"});
      }
      
          const passcmp = await bcryptjs.compare(password, user.password);
          
        if (!passcmp) {
          return res.status(400).json({ error: "Enter valid Credentials" });
          }
        const data = {
            user: {
                id:user.id
             }
      }
      id = user.id;
        const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
      console.log("logged in succesfully");
      login = true;
    }
    catch (error) {
      console.log(error.message);
        res.status(500).json({ error: "Internal server error occurred" });
    }
  }
);



//ROUTE  #3     GET USER DATA


router.post(
  "/getuser",fetchuser,
    async (req, res) => {
      
    try {
        const userid = req.user.id; 
        const user = await User.findById(userid).select("-password");
        res.send(user);

    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error occurred" });
    }
  }
);



module.exports = router;
