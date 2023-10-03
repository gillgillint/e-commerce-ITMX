import { createSlice } from "@reduxjs/toolkit";

export interface SidebarState {
  isOpen: boolean;
}

const initialState: SidebarState = {
  isOpen: false,
};

export const sideBarSlice = createSlice({
  name: "sideBar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleSidebar } = sideBarSlice.actions;

export default sideBarSlice.reducer;
