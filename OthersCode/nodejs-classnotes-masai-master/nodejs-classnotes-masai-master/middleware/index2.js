const express = require("express");

const app = express();

// admin, user, student, teacher, IA, SDE1

app.get("/user", logger1("admin"), (req, res) => {
  res.send(req.role);
});

function logger1(role) {
  return function (req, res, next) {
    if (role == "admin") {
      req.role = "admin";
    } else {
      req.role = "user";
    }
    next();
  };
}

app.listen(2345, function () {
  console.log("listening on port 2345");
});