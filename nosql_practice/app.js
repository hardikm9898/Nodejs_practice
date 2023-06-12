const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

require("dotenv").config();

const { PORT } = process.env;
const mongoConnect = require("./data/connect").mongoConnect;

const User = require("./model/user-model");

const app = express();

const adminRoutes = require("./routes/admin");
const homeroutes = require("./routes/user");
const errorRoute = require("./routes/error");

// middleware

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded());

app.use(async (req, res, next) => {
  try {
    const user = await User.findById("647ec58ded9b12467ef87209");

    const { userName, email, cart, _id } = user;

    req.user = new User(userName, email, cart, _id);
    next();
  } catch (error) {
    throw error.message;
  }
});

app.use("/admin", adminRoutes);
app.use(homeroutes); // ? path filtering
app.use(errorRoute);

mongoConnect();

app.listen(PORT, (err) => {
  console.log(`server is  running in port ${PORT}`);
});
