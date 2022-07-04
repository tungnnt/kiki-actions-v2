const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const automation = require("./automation");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) =>
  res.json({
    msg: `Kiki Automation Server`,
  })
);

app.post("/automation", async (req, res) => {
  await automation({ ...req.body });
  res.json({
    msg: `Run automation success`,
  });
});

module.exports = app;
