import store from "index";
import { createNote, deleteNote, updateNote } from "store/reducers/noteSlice";
import notificationHelper from "utils/ui/notificationHelper";
import noteEvent from "./noteService.event";

const noteInitialListener = () => {
  noteEvent.onCreateNote((data) => {
    store.dispatch(createNote(data.note));
    notificationHelper.success("Note created successfully");
  });
  noteEvent.onUpdateNote((data) => {
    store.dispatch(updateNote(data.note));
    notificationHelper.success("Note updated successfully");
  });
  noteEvent.onDeleteNote((data) => {
    store.dispatch(deleteNote(data.noteId));
    notificationHelper.success("Note deleted successfully");
  });
};

export default noteInitialListener;
