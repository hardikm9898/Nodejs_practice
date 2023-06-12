const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
require("dotenv").config();

const { port } = process.env;
const adminRoutes = require("./routes/admin");
const homeroutes = require("./routes/user");
const errorRoute = require("./routes/error");
// middleware

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(homeroutes); // path filtering

app.use(adminRoutes);

app.use(errorRoute);

app.listen(port);
