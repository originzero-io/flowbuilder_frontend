import store from "index";
import { createNote, deleteNote, updateNote } from "store/reducers/noteSlice";
import notificationHelper from "utils/ui/notificationHelper";
import noteServiceSocket from "./noteService.event";

const useNoteInitialListener = () => {
  noteServiceSocket.onCreateNote((data) => {
    store.dispatch(createNote(data.note));
    notificationHelper.success("Note created successfully");
  });
  noteServiceSocket.onUpdateNote((data) => {
    store.dispatch(updateNote(data.note));
    notificationHelper.success("Note updated successfully");
  });
  noteServiceSocket.onDeleteNote((data) => {
    store.dispatch(deleteNote(data.noteId));
    notificationHelper.success("Note deleted successfully");
  });
};

export default useNoteInitialListener;
