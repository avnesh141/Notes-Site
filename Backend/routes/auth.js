
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // res.json({ "name": "avnesh" });
    console.log(req.body);
    res.send("hello");
})

module.exports = router;