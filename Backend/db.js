const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook";
mongoose.set('strictQuery', 'true');
const connectTomongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("connected to mongo Succesfully")
    })
}
module.exports = connectTomongo;