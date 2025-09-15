import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SidebarState {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  activeItem: string;
  expandedSections: string[];
}

const initialState: SidebarState = {
  isCollapsed:true,
  isMobileOpen: false,
  activeItem: "dashboard",
  expandedSections: ["overview", "properties"],
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleCollapse(state) {
      state.isCollapsed = !state.isCollapsed;
    },
    toggleMobile(state) {
      state.isMobileOpen = !state.isMobileOpen;
    },
    setActiveItem(state, action: PayloadAction<string>) {
      state.activeItem = action.payload;
    },
    toggleSection(state, action: PayloadAction<string>) {
      if (state.isCollapsed) return;
      if (state.expandedSections.includes(action.payload)) {
        state.expandedSections = state.expandedSections.filter(
          (id) => id !== action.payload
        );
      } else {
        state.expandedSections.push(action.payload);
      }
    },
    closeMobile(state) {
      state.isMobileOpen = false;
    },
  },
});

export const {
  toggleCollapse,
  toggleMobile,
  setActiveItem,
  toggleSection,
  closeMobile,
} = sidebarSlice.actions;

export default sidebarSlice;
