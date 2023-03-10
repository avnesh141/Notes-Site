import React, { useContext, useState } from "react";
import notecontext from "../Contexts/notes/NotesContexts";
import alertcontext from "../Contexts/Alert/AlertContext";
import './AddNote.css'
const AddNote = () => {
  const context = useContext(notecontext);
  const { Addnote } = context;
  const alcontext = useContext(alertcontext);
  const { setalert } = alcontext;
  const [note, setnote] = useState({ title: "", description: "", tag: "" });
  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  const clickhandler = () => {
    console.log("add");
    Addnote(note);
    setalert("SUCCESS", "Note Added SuccessFully");
    setnote({ title: "", description: "", tag: "" });
  };
  return (
    <div className="text-center" >
      <div
        className="mt-3 text-center"
        style={{ display: "inline-block", margin: "auto", width: "80%" }}
      >
        <h1>Add a Note</h1>
        <form>
          <div className="mb-3 ">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              <h5>Title</h5>
            </label>
            <input
              style={{ margin: "auto" }}
              type="name"
              name="title"
              value={note.title}
              className="form-control inputN"
              id="exampleFormControlInput1"
              placeholder="Meeting"
              onChange={onchange}
            />
            <label
              htmlFor="exampleFormControlInput2"
              className="form-label mt-2"
            >
              <h5>Tag</h5>
            </label>
            <input
              name="tag"
              style={{ margin: "auto" }}
              type="name"
              value={note.tag}
              className="form-control inputN"
              id="exampleFormControlInput2"
              placeholder="Web"
              onChange={onchange}
            />
            <label
              htmlFor="exampleFormControlTextarea1"
              className="form-label mt-2"
            >
              <h5>Description</h5>
            </label>
            <input
              style={{ margin: "auto" }}
              name="description"
              type="text"
              value={note.description}
              className="form-control inputN"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="You have a Meeting related to web"
              onChange={onchange}
            />
            <button
              type="submit"
              className="buttonAdd mb-3 my-3"
              disabled={note.description.length < 5 || note.title.length < 5}
              onClick={clickhandler}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
