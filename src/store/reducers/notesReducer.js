import { getNotesService } from "../../services/noteService";
import * as actions from "../constants/noteConstants";

const noteReducer = (state = [], { type, payload }) => {
  switch (type) {
    case actions.GET_NOTES:
      return payload;
    case actions.CREATE_NOTE:
      return [...state, payload];
    case actions.UPDATE_NOTE:
      // return {
      //   activenote: payload,
      //   notes: state.notes.map((state) => {
      //     if (state._id === payload._id) {
      //       return payload;
      //     } else return state;
      //   }),
      // };
      return state.map((s) => {
        if (s._id === payload._id) {
          return payload;
        } else return s;
      });
    case actions.DELETE_NOTE:
      return state.filter((s) => s._id !== payload._id);
    default:
      return state;
  }
};
export default noteReducer;

export const getNotes = (workspace) => async (dispatch) => {
  const { notes } = await getNotesService(workspace);
  dispatch({
    type: actions.GET_NOTES,
    payload: notes,
  });
};
export const createNote = (note) => ({
  type: actions.CREATE_NOTE,
  payload: note,
});
export const updateNote = (note) => ({
  type: actions.UPDATE_NOTE,
  payload: note,
});
export const deleteNote = (note) => ({
  type: actions.DELETE_NOTE,
  payload: note,
});