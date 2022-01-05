import React, { useEffect, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { VscTrash } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import { noteNamespace } from "../../../../App";
import { setModal } from "../../../../store/reducers/componentReducer";
import { getNotes } from "../../../../store/reducers/notesReducer";
import useAuth from "../../../../utils/useAuth";
import useNotes from "../../../../utils/useNotes";
import Avatar from "../../../global/Avatar";
import AddNoteForm from "./AddNoteForm";
import EditNoteForm from "./EditNoteForm";
import { NoteContainer, NoteContent, NoteTitle } from "./style";

export default function NotesPanel() {
  const notes = useNotes();
  const auth = useAuth();
  const dispatch = useDispatch();
  const [hoveredNote, setHoveredNote] = useState("");
  const addNoteHandle = () => {
    dispatch(setModal(<AddNoteForm />));
  };
  const deleteNoteHandle = (note) => {
    if (confirm("Sure?")) {
      noteNamespace.emit("notes:remove", { note });
    }
  };
  const viewNoteHandle = (note) => {
    dispatch(setModal(<EditNoteForm note={note} />));
  };
  useEffect(() => {
    dispatch(getNotes());
  }, []);
  return (
    <>
      <Button color="success" onClick={addNoteHandle}>
        <BsPlusCircle style={{ fontSize: "2.5vmin" }} /> Add Note
      </Button>
      {notes.map((note) => {
        return (
          <NoteContainer
            key={note._id}
            onMouseEnter={() => setHoveredNote(note._id)}
            onMouseLeave={() => setHoveredNote(false)}
            onClick={() => viewNoteHandle(note)}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ width: "95%", cursor: "pointer" }}>
                <NoteTitle>{note.title}</NoteTitle>
                <NoteContent>{note.content}</NoteContent>
              </div>
              {hoveredNote === note._id && note.createdBy._id === auth._id && (
                <div
                  style={{
                    width: "5%",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <VscTrash
                    style={{ fontSize: "3vmin" }}
                    onClick={() => deleteNoteHandle(note)}
                  />
                </div>
              )}
            </div>
            <div>
              <div style={{ float: "right" }}>
                <Avatar avatar={note.createdBy.avatar} size={24} />
                <span
                  style={{
                    fontSize: "1.2vmin",
                    paddingRight: "10px",
                    paddingLeft: "5px",
                    color: "#7f8c8d",
                  }}
                >
                  {note.createdBy.name}
                </span>
              </div>
            </div>
          </NoteContainer>
        );
      })}
    </>
  );
}
