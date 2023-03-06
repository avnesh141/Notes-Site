// const connectTomongo = require("./db");
const express = require("express");
var cors = require("cors");
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 5000;
console.log(port)
// const mongoURI ="mongodb://avnesh:Ak2566@ac-rses7d7-shard-00-00.hbvar0z.mongodb.net:27017,ac-rses7d7-shard-00-01.hbvar0z.mongodb.net:27017,ac-rses7d7-shard-00-02.hbvar0z.mongodb.net:27017/?ssl=true&replicaSet=atlas-10g058-shard-0&authSource=admin&retryWrites=true&w=majority"
const connetparams = {
  useNewUrlParser: true,
  useUnifiedTopology:true
}

const mongoURI = process.env.MONGODB_URI;
console.log(mongoURI);
mongoose.set('strictQuery', 'true');
const connectTomongo = () => {
  mongoose.connect(mongoURI,connetparams).then(() => {
    console.log("connected to mongo Succesfully")
  }).catch((error) => {
    console.log({ error });
  })
}
// module.exports = connectTomongo;
connectTomongo();
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));


if(process.env.NODE_ENV=="production")
{
  app.use(express.static("client/build"));
}


app.listen(port, () => {
  console.log(`Example app listening on port  http://localhost:${port}`);
});
