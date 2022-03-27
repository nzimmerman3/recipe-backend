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
        res.json(result);
      }
    });
});

recordRoutes.route("/api").post((req, res) => {
  const dbConnect = dbo.getDb();
  console.log("new message!");
  console.log(req.body);
  // const recipe = {

  // }
});

module.exports = recordRoutes;
