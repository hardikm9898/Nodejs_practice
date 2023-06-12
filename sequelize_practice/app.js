const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

require("dotenv").config();

const { PORT } = process.env;

const app = express();

const adminRoutes = require("./routes/admin");
const homeroutes = require("./routes/user");
const errorRoute = require("./routes/error");
const User = require("./models/user");
// middleware

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(async (req, res, next) => {
  try {
    const user = await User.findAll({ where: { id: 1 } });

    req.user = user;
    next();
  } catch (error) {
    throw error.message;
  }
});
app.use(homeroutes); // path filtering

app.use("/admin", adminRoutes);

app.use(errorRoute);

app.listen(PORT);
