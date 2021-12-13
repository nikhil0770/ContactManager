const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User");
const { JWT_SECRET } = require("../config/prod");
router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) return res.json({ error: "Invalid Email/Password" });

      bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (!matched) return res.json({ error: "Invalid Email/password" });

          const token = jwt.sign({ _id: user._id }, JWT_SECRET);
          const { _id, email, name } = user;
          res.json({
            token,
            user: { _id, email, name },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/signup", (req, res) => {
  const { name, email, password, phno } = req.body;
  if (!email || !name || !password)
    return res.status(422).json({ error: "Fill all the fields" });
  if (!/\d/.test(phno) || phno.length != 10)
    return res.json({ error: "Incorrect Values" });
  User.findOne({ email: email })
    .then((saveduser) => {
      if (saveduser) return res.json({ message: "Account Already Exists" });
      bcrypt.hash(password, 12).then((hashedpass) => {
        const user = new User({
          name,
          email,
          password: hashedpass,
          phno,
        });
        user
          .save()
          .then((user) => {
            return res.json({ message: "Registered Successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
