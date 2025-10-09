import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import api from "@/axios/axios";

import type { IEstate } from "@/shared/types/IEstate";

interface AddEstatePayload {
  name: string;
  location: string;
  description: string;
  totalUnits: number;
  status: "active" | "maintenance" | "inactive";
}

interface EstateState {
  showAddPropertyModal: boolean;
  loading: boolean;
  error: string | null;
  success: boolean;
  estate: IEstate | null;
}

const initialState: EstateState = {
  showAddPropertyModal: false,
  loading: false,
  error: null,
  success: false,
  estate: null,
};

// Async thunk for adding estate
export const addEstate = createAsyncThunk(
  "estates/addEstate",
  async (estateData: AddEstatePayload, { rejectWithValue }) => {
    try {
      const payload = {
        ...estateData,
      };

      const response = await api.post("/estates", payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add property"
      );
    }
  }
);

const estateSlice = createSlice({
  name: "estate",
  initialState,
  reducers: {
    openAddPropertyModal(state) {
      state.showAddPropertyModal = true;
      state.error = null;
      state.success = false;
    },
    closeAddPropertyModal(state) {
      state.showAddPropertyModal = false;
      state.error = null;
      state.success = false;
      state.estate = null;
    },
    toggleAddPropertyModal(state) {
      state.showAddPropertyModal = !state.showAddPropertyModal;
      state.error = null;
      state.success = false;
    },
    clearEstateState(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.estate = null;
    },
    setEstateError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add estate pending
      .addCase(addEstate.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      // Add estate fulfilled
      .addCase(addEstate.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.estate = action.payload.estate;
        state.showAddPropertyModal = false; // Close modal on success
      })
      // Add estate rejected
      .addCase(addEstate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
        state.estate = null;
      });
  },
});

export const {
  openAddPropertyModal,
  closeAddPropertyModal,
  toggleAddPropertyModal,
  clearEstateState,
  setEstateError,
} = estateSlice.actions;

export default estateSlice;
