const mongoose = require('mongoose');
const mongoURI =
  "mongodb://avnesh:Ak2566@ac-rses7d7-shard-00-00.hbvar0z.mongodb.net:27017,ac-rses7d7-shard-00-01.hbvar0z.mongodb.net:27017,ac-rses7d7-shard-00-02.hbvar0z.mongodb.net:27017/?ssl=true&replicaSet=atlas-10g058-shard-0&authSource=admin&retryWrites=true&w=majority";
const connetparams = {
  useNewUrlParser: true,
  useUnifiedTopology:true
  }

mongoose.set('strictQuery', 'true');
const connectTomongo = () => {
    mongoose.connect(mongoURI,connetparams).then(() => {
        console.log("connected to mongo Succesfully")
    }).catch((error) => {
      console.log({ error });
    })
}
module.exports = connectTomongo;
