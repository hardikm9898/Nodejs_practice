const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 5000;
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





app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
