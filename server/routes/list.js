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
      if (err) {
        res.status(400).send("Error getting recipe");
      } else {
        console.log("Sending recipe");
        res.json(result);
      }
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
  const match = { user: req.query.id };
  dbConnect.collection("favorites").findOne(match, (err, result) => {
    if (err) {
      res.status(400).send("Error getting favorites");
    } else {
      console.log("Sending favorites");
      res.json(result);
    }
  });
});

recordRoutes.route("/api/favorites").put(({ body }, res) => {
  const dbConnect = dbo.getDb();
  const match = { user: body.user };
  if (body.favorite) {
    //add recipe to user's favorite list
    try {
      dbConnect
        .collection("favorites")
        .updateOne(
          match,
          { $push: { favorites: body.recipe } },
          { upsert: true }
        );
      console.log("Added recipe to favorites");
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      dbConnect
        .collection("favorites")
        .updateOne(match, { $pull: { favorites: body.recipe } });
      console.log("Removed recipe from favorites");
    } catch (error) {
      console.log(error);
    }
  }
});

module.exports = recordRoutes;
