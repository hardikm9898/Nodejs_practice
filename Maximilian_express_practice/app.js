const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config()

const {PORT} = process.env;

const app = express();
const adminRoutes = require("./routes/admin");
const homeroutes = require("./routes/user");
const errorRoute = require("./routes/error");
// middleware

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// routing and send post request

app.use(homeroutes); // path filtering

app.use(adminRoutes);

app.use(errorRoute);

app.listen(PORT,()=>{
    console.log(PORT);
});
