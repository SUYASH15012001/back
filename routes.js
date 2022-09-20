const express = require("express");
const userModel = require("./model");
const fs = require("fs");
const app = express();

// Signup
app.post("/users", async (req, res) => {
  const user = new userModel(req.body);

  try {
    userModel
      .findOne({ username: req.body.username })
      .then(async (result) => {
        if (result?.username) res.send("User already exists");
        else {
          await user.save();
          res.send(user);
        }
      })
      .catch((err) => res.send(err));
    // console.log(existingOne?.schema?.tree);
    // if (existingOne) res.send(existingOne);
  } catch (error) {
    res.status(500).send(error);
  }
});

// login
app.post("/user", async (req, res) => {
  await userModel
    .findOne(req.body)
    .then((user) => {
      if (!user) res.send({});
      else res.json(user);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

// updateUser
app.patch("/user/:id", async (req, res) => {
  await userModel
    .findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    .then((user) => {
      if (!user) res.status(403).send({});
      res.json(user);
    })
    .catch((err) => res.send(err));
});

// get all users
app.get("/users", async (req, res) => {
  const users = await userModel.find({});

  try {
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
