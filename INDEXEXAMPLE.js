const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/routes");

app.use(cors());

const dbPassword = "nIfTcQjmAOFWH2kH";

mongoose.connect(
  `mongodb+srv://admin:${dbPassword}@cluster0-zb0x5.mongodb.net/prod?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsWhitelist = [
  "http://localhost:8080/",
  "http://localhost:8100/",
  "http://localhost:3000/"
];

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, X-Requested-With, Accept, Authorization"
    );
  }
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
    res.status(200).json({});
  }
  next();
});

app.use("/", routes);

app.listen(port, () => console.log("Listening to 8080..."));
module.exports = app;