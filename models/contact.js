const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const contactschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phno: {
      type: String,
      required: true,
    },
    todolist: {
      type: String,
      default: "",
    },
    contactsof: {
      type: ObjectId,
      ref: "User",
    },
    favorites: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

mongoose.model("Contacts", contactschema);
