const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phno: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mycontacts: [
    {
      type: ObjectId,
      ref: "Contacts",
    },
  ],
});

mongoose.model("User", userschema);
