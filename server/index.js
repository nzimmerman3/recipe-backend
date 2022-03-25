require("dotenv").config({ path: "./config.env" });

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(require("./routes/list"));
const dbo = require("./conn.js");
const PORT = process.env.PORT || 3001;

dbo.connectToServer((err) => {
  if (err) {
    console.log(err);
    process.exit();
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
