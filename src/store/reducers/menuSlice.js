import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    state: false,
    x: 0,
    y: 0,
    element:{}
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    panelMenu: initialState,
    multiSelectionMenu: initialState,
    elementMenu: initialState,
    groupMenu: initialState,
  },
  reducers: {
    setPanelContextMenu(state, { payload }) {
      state.panelMenu = payload
    },
    setElementContextMenu(state, { payload }) {
      state.elementMenu = payload
    },
    setMultiSelectionContextMenu(state, { payload }) {
      state.multiSelectionMenu = payload
    },
    setGroupMenu(state, { payload }) {
      state.groupMenu = payload
    }
  }
})

export const { setPanelContextMenu, setElementContextMenu, setMultiSelectionContextMenu, setGroupMenu } = menuSlice.actions;
export default menuSlice.reducer;