const express = require("express");
const logger = require("morgan");
const offers = require("./routes/offerRoute");
const users = require("./routes/userRoute");
const bodyParser = require("body-parser");
const mongoose = require("./config/database"); //database configuration
var jwt = require("jsonwebtoken");
const connectDb = require("./config/database");
const app = express();
app.set("secretKey", "nodeRestApi"); // jwt secret token
// connection to mongodb
connectDb();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", function (req, res) {
  res.json({ success: "true" });
});
// public route
app.use("/users", users);
// private route
app.use("/offers", validateUser, offers);
app.get("/favicon.ico", function (req, res) {
  res.sendStatus(204);
});
//middleware
function validateUser(req, res, next) {
  jwt.verify(
    req.headers["x-access-token"],
    req.app.get("secretKey"),
    function (err, decoded) {
      if (err) {
        res.json({ status: "error", message: err.message, data: null });
      } else {
        // add user id to request
        req.body.userId = decoded.id;
        next();
      }
    }
  );
}

// handle 404 error
app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});
// handle errors
app.use(function (err, req, res, next) {
  console.log(err);

  if (err.status === 404) res.status(404).json({ message: "Not found" });
  else res.status(500).json({ message: "Something looks wrong :( !!!" });
});
app.listen(3000, function () {
  console.log("Node server listening on port 3000");
});
