// const connectTomongo = require("./db");
const express = require("express");
var cors = require("cors");
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const { JWT_SECRET, MOGOURI } = require("./config/keys");
const port =5000;
console.log(port)
// const mongoURI ="mongodb://avnesh:Ak2566@ac-rses7d7-shard-00-00.hbvar0z.mongodb.net:27017,ac-rses7d7-shard-00-01.hbvar0z.mongodb.net:27017,ac-rses7d7-shard-00-02.hbvar0z.mongodb.net:27017/?ssl=true&replicaSet=atlas-10g058-shard-0&authSource=admin&retryWrites=true&w=majority"
const connetparams = {
  useNewUrlParser: true,
  useUnifiedTopology:true
}

mongoose.set('strictQuery', 'true');
const connectTomongo = () => {
  mongoose
    .connect(MOGOURI, connetparams)
    .then(() => {
      console.log("connected to mongo Succesfully");
    })
    .catch((error) => {
      console.log({ error });
    });
}
// module.exports = connectTomongo;
connectTomongo();
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));



if (process.env.NODE_ENV == "production") {
  const path = require("path");

  app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "client", "build")));
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}





app.listen(port, () => {
  console.log(`Example app listening on port  http://localhost:${port}`);
});
