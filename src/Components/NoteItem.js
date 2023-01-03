import React, { useContext } from 'react'
import './Noteitem.css'
import notecontext from '../Contexts/notes/NotesContexts';
import alertcontext from '../Contexts/Alert/AlertContext';

const NoteItem = (props) => {
  const { note,updateNote } = props;
  const context = useContext(notecontext);
  const alcontext = useContext(alertcontext);
  const { setalert } = alcontext;
  const { deleteNote} = context;
  const clickhandler = () => {
    deleteNote(note._id);
    setalert("success", "Note Deleted SuccessFully");
  }
    return (
      <div className="card mx-2 my-3">
        <div className=" my-3 mx-2" style={{ width: "18rem",height:'auto'}}>
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
            <p className="card-text">{note.description}</p>
            <div className="d-flex justify-content-between">
              <i className="fa-solid fa-trash"  onClick={clickhandler}></i>
              <i className="fa-solid fa-file-pen" onClick={() => {
                console.log('first');
              updateNote(note);
              }}></i>
            </div>
          </div>
        </div>
      </div>
    );
}

export default NoteItem