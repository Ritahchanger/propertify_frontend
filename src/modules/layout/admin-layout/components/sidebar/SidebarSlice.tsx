import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SidebarState {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  activeItem: string;
  expandedSections: string[];
}

const STORAGE_KEY = "sidebarState";

function loadSidebarState(): SidebarState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Failed to load sidebar state:", error);
    return null;
  }
}

function saveSidebarState(state: SidebarState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save sidebar state:", error);
  }
}

const defaultState: SidebarState = {
  isCollapsed: true,
  isMobileOpen: false,
  activeItem: "dashboard",
  expandedSections: ["overview", "properties"],
};


const initialState: SidebarState = loadSidebarState() || defaultState;

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleCollapse(state) {
      state.isCollapsed = !state.isCollapsed;
      saveSidebarState(state);
    },
    toggleMobile(state) {
      state.isMobileOpen = !state.isMobileOpen;
      saveSidebarState(state);
    },
    setActiveItem(state, action: PayloadAction<string>) {
      state.activeItem = action.payload;
      saveSidebarState(state);
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
      saveSidebarState(state);
    },
    closeMobile(state) {
      state.isMobileOpen = false;
      saveSidebarState(state);
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
