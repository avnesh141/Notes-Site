const { body, validationResult } = require("express-validator");

const express = require("express");

const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");



//Route #1 fetch all notes of loggedin USER

router.get("/fetch", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  }
  catch (error) {
    res.status(500).send({ error });
  }
});



//Route #2 Create new note

router.post("/createnotes",fetchuser, body("title", "title must not be too small").isLength({ min: 3 }), async (req, res) => {
  

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    console.log("You are inside CreateNotes");
   let user = await Note.create({
      user:req.user.id,
      title: req.body.title,
      tag: req.body.tag,
      description: req.body.description,
    });
    res.send(user);
  } catch (error) {
    res.send({ error:error.message });
  }
});
//Route #3 Update A note

router.put("/update/:id",fetchuser, async (req, res) => {
  const { tag, title, description } = req.body;
  console.log("you are inside edit")
  try {
    let newNote = {};
    if (tag) {
      newNote.tag = tag;
        }
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    console.log(req.params.id);
    let note = await Note.findOne({_id:req.params.id});
    console.log(note);
    if (!note)
    {
      return res.status(401).send({ error: "Not Found" });
    }
    console.log(note.user.toString());
    console.log(note);
    console.log(req.user.id);
    if (note.user.toString() !== req.user.id)
    {
     return  res.status(401).send("Not Allowed to do this");
    }
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.send({ note });
    }
     catch (error) {
    res.send({ error:error.message });
  }
});


//Route #4 Delete a note.

router.delete("/delete/:id",fetchuser, async (req, res) => {
  const { tag, title, description } = req.body;
  try {
    let note = await Note.findOne({_id:req.params.id});
    if (!note)
    {
      return res.status(401).send({ error: "Not Found" });
    }
    console.log(note.user.toString());
    console.log(req.user.id);
    if (note.user.toString() !== req.user.id)
    {
     return  res.status(401).send("Not allowed to do this");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.send({message:"Note Deleted successfully"});
    }
     catch (error) {
    res.send({ error:error.message });
  }
});

module.exports = router;
