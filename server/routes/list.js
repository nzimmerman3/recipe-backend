const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../conn");

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
  console.log("new message!");
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

module.exports = recordRoutes;
