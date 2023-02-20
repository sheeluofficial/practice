const express = require("express");

const users = require("./users.json");

const app = express();

/*
    HTTP VERBS
    Get
    Post
    Put
    Patch
    Delete
*/

app.get("", (req, res) => {
  // do a lot of things here
  return res.send("Hello");
});

app.get("/users", (req, res) => {
  return res.send({ users: users });
});

app.listen(2345, function () {
  console.log("listening on port 2345");
});
