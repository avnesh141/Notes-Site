import NoteContext from "./NotesContexts";
import { useState } from "react";
const NoteState = (props) => {
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);
  const getNotes = async () => {
    const response = await fetch("http://localhost:5000/api/notes/fetch", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };
  const Addnote = async (note) => {
    const response = await fetch(
      "http://localhost:5000/api/notes/createnotes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(note),
      }
    );
    console.log(response);
  };
  const EditNote = async (id, note) => {
    const response = await fetch(
      `http://localhost:5000/api/notes/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(note),
      }
    );
    console.log(response);
  };
  const deleteNote = async (id) => {
    const response = await fetch(
      `http://localhost:5000/api/notes/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    console.log(response);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        Addnote,
        EditNote,
        getNotes,
        deleteNote,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
