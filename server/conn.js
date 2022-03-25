const { MongoClient } = require("mongodb");
const connectionString = process.env.ATLAS_URI;
// const connectionString =
//   "mongodb+srv://nzimmerman3:7loqEIKKNLQJxE2C@cluster0.fosho.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(connectionString);

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db("recipeDB");
      console.log("Successfully connected to MongoDB.");

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};
