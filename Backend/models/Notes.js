const mongoose = require("mongoose");
const NotesSchema = new Schema({
  title: {
    type: String,
    requireed: true,
  },
  tag: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default:Date.now
  },
});
module.exports = mongoose.model("notes", NotesSchema);
