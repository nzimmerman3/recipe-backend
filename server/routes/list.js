const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../conn");
var mongoose = require("mongoose");

recordRoutes.route("/api").get(async function (_req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection("recipes")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        console.log("Sent recipes");
        res.json(result);
      }
    });
});

recordRoutes.route("/api").post((req, res) => {
  const dbConnect = dbo.getDb();
  console.log("new recipe:");
  console.log(req.body);
  dbConnect.collection("recipes").insertOne(req.body, (err, result) => {
    if (err) {
      res.status(400).send("Error adding recipe");
    } else {
      console.log("Added new recipe");
      res.status(204).send();
    }
  });
});

recordRoutes.route("/api").delete((req, res) => {
  const dbConnect = dbo.getDb();

  const match = { _id: mongoose.Types.ObjectId(req.body.recipe._id) };
  dbConnect.collection("recipes").deleteOne(match, (err, result) => {
    if (err) {
      req.status(400).send("Error deleting recipe");
    } else {
      console.log("Deleted recipe");
    }
  });
});

module.exports = recordRoutes;
