const mongoose = require('mongoose');
const mongoURI =
  "mongodb+srv://vercel-admin-user:8twwsrTodZjdCrJP@cluster0.hbvar0z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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
