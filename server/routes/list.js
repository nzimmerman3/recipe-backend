const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../conn");
var mongoose = require("mongoose");

recordRoutes.route("/api/recipes").get(async function (_req, res) {
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

recordRoutes.route("/api/recipe").get(async (req, res) => {
  const dbConnect = dbo.getDb();
  const match = { _id: mongoose.Types.ObjectId(req.query.recipe) };

  const result = await dbConnect
    .collection("recipes")
    .findOne(match, (err, result) => {
      console.log("Sending recipe");
      res.json(result);
    });
});

//62432214ba4b9c35a33adf1b

recordRoutes.route("/api/recipes").post((req, res) => {
  const dbConnect = dbo.getDb();
  console.log("New recipe:");
  dbConnect.collection("recipes").insertOne(req.body, (err, result) => {
    if (err) {
      res.status(400).send("Error adding recipe");
    } else {
      console.log("Added new recipe");
      res.send(req.body._id);
      // res.status(204).send();
    }
  });
});

recordRoutes.route("/api/recipes").delete((req, res) => {
  const dbConnect = dbo.getDb();
  const match = { _id: mongoose.Types.ObjectId(req.body.recipe) };
  dbConnect.collection("recipes").deleteOne(match, (err, result) => {
    if (err) {
      req.status(400).send("Error deleting recipe");
    } else {
      console.log("Deleted recipe");
    }
  });
});

recordRoutes.route("/api/favorites").get((req, res) => {
  const dbConnect = dbo.getDb();
  const match = { _id: mongoose.Types.ObjectId(req.body.user) };
  console.log("Getting favorites");
  const result = dbConnect.collection("favorites").findOne({ match });
  res.json(result);
});

//TODO endpoint where body of post message
// favorites[userId] = [recipeId, recipdId, ...]

module.exports = recordRoutes;
