const connectTomongo = require('./db');
const express = require("express");
var cors = require('cors');
connectTomongo();
const app = express();
app.use(cors());
const port = 5000;
app.use(express.json());


app.use("/api/auth", require('./routes/auth'));
app.use("/api/notes", require('./routes/notes'));
// app.get("/api/login", (req, res) => {
//   res.send("Hello World Login");
// }); 
// app.get("/api/signup", (req, res) => {
//   res.send("Hello World Signup");
// });

app.listen(port, () => {
  console.log(`Example app listening on port  http://localhost:${port}`);
});