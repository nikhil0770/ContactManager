const express = require("express");
const app = express();
const mongoose = require("mongoose");

const { MONGOURI } = require("./config/prod");

const PORT = 5000;

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Mongoose Connected");
});

mongoose.connection.on("error", (error) => {
  console.log("Error : ", error);
});
require("./models/user");
require("./models/contact");

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/handlers"));

app.listen(PORT, () => {
  console.log(`Server Running at ${PORT}`);
});
