const express = require("express");
const requirelogin = require("../middleware/requirelogin");
const router = express.Router();
const mongoose = require("mongoose");

const Contacts = mongoose.model("Contacts");
const User = mongoose.model("User");

router.post("/addcontact", requirelogin, (req, res) => {
  const { name, phno, todolist } = req.body;

  if (!name || !phno) return res.json({ error: "Fill in all the fields" });

  if (!/\d/.test(phno) || phno.length != 10)
    return res.json({ error: "Incorrect Values" });

  req.user.password = undefined;
  req.user.email = undefined;

  const contactinfo = new Contacts({
    name,
    phno,
    todolist,
    contactsof: req.user,
  });

  contactinfo
    .save()
    .then((result) => {
      User.findByIdAndUpdate(
        { _id: req.user._id },
        {
          $push: { mycontacts: result._id },
        },
        {
          new: true,
        }
      )
        .then((result) => {
          res.json({ result, message: "New Contact Created" });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/getcontacts", requirelogin, (req, res) => {
  Contacts.find({ contactsof: req.user._id })
    .populate("contactsof", "_id")
    .sort("-createdAt")
    .then((mycontacts) => {
      //   console.log(mycontacts);
      res.json(mycontacts);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/getdetails/:id", requirelogin, (req, res) => {
  Contacts.findOne({ _id: req.params.id })
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/getuser", requirelogin, (req, res) => {
  User.findOne({ _id: req.user._id })
    .select("name phno")
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/updatecontact/:id", requirelogin, (req, res) => {
  Contacts.findByIdAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
      phno: req.body.phno,
      todolist: req.body.todo,
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) return res.json({ error: err });

    res.json({ message: "Updated" });
  });
});

router.post("/updateuser", requirelogin, (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.user._id },
    {
      name: req.body.name,
      phno: req.body.phno,
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) return res.json({ error: err });

    res.json({ message: "Updated" });
  });
});

router.delete("/deletecontact/:id", requirelogin, (req, res) => {
  Contacts.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.json({ message: "Contact Deleted" });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/favorites/:id/:chk", requirelogin, (req, res) => {
  Contacts.findByIdAndUpdate(
    { _id: req.params.id },
    {
      favorites: req.params.chk,
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) return res.json({ error: err });

    res.json({ result, message: "Favorites Updated" });
  });
});

router.get("/profile", requirelogin, (req, res) => {
  User.findOne({ _id: req.user._id })
    .populate("mycontacts", "_id")
    .select("-password")
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/search", requirelogin, (req, res) => {
  const searchpattern = new RegExp("^" + req.body.name);
  Contacts.find({ name: { $regex: searchpattern, $options: "$i" } })
    .populate("contactsof", "_id")
    .select("-updatedAt")
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
