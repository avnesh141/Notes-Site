import React, { useRef,useState } from "react";
import "./Notes.css";
import { useEffect } from "react";
import { useContext } from "react";
import notecontext from "../Contexts/notes/NotesContexts";
import alertcontext from "../Contexts/Alert/AlertContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
const Notes = () => {

  const navigate = useNavigate();

  const ncontext = useContext(notecontext);
  const { notes, getNotes, EditNote } = ncontext;
  const alcontext = useContext(alertcontext);
  const { setalert } = alcontext;
  const [note, setnote] = useState({ title: "", description: "", tag: "" });
  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value});
  }
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    }
    else
    {
      navigate('/login');
      }
  });
  const [id, setid] = useState(null);
  const ref = useRef(null);
  const updateNote = (currentNote) => {
    setid(currentNote._id);
    setnote(currentNote);
    ref.current.click();
  }
  const clicksave = () => {
    console.log('clicked');
    EditNote(id, note);
    setalert("success", "Note Updated Succefully");
  }
  return (
    <div style={{ position: "relative", top: "110px" }}>
      <AddNote />
      <button
        style={{ display: "none" }}
        ref={ref}
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3 ">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  <h6>Title</h6>
                </label>
                <input
                  type="name"
                  name="title"
                  value={note.title}
                  className="form-control inputN"
                  id="exampleFormControlInput1"
                  placeholder="Meeting"
                  onChange={onchange}
                  minLength={5}
                  required
                />
                <label
                  htmlFor="exampleFormControlInput2"
                  className="form-label my-3"
                >
                  <h6>Tag</h6>
                </label>
                <input
                  name="tag"
                  type="name"
                  value={note.tag}
                  className="form-control inputN"
                  id="exampleFormControlInput2"
                  placeholder="Web"
                  onChange={onchange}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  <h6>Description</h6>
                </label>
                <input
                  name="description"
                  type="text"
                  value={note.description}
                  className="form-control inputN"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="You have a Meeting related to web"
                  onChange={onchange}
                  minLength={5}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                data-bs-dismiss="modal"
                type="button"
                className="btn btn-primary"
                onClick={clicksave}
                disabled={note.description.length < 5 || note.title.length < 5}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container text-center ">
        <h1>Your Notes</h1>
        <div className="my-3">
          {notes.length ? (
            notes.map((note, id) => {
              return <NoteItem key={id} note={note} updateNote={updateNote} />;
            })
          ) : (
            <h4>You do not have Any Notes.</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
