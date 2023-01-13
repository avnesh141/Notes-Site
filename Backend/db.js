const mongoose = require('mongoose');

require("dotenv").config({ path: require("find-config")(".env") });
const uri = process.env.MONGODB_URI;


const mongoURI =uri;
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
