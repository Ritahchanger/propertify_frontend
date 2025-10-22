import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/axios/axios";
import type { RootState } from "@/store/store";
// Types
interface Unit {
  id: string;
  unitNumber: string;
  status: string;
  monthlyRent: string;
  bedrooms: number;
  bathrooms: number;
  depositAmount: string;
  unitType: string;
  floorArea: string;
  description: string;
  estateId: string;
  created_at: string;
  updated_at: string;
}

interface CreateUnitData {
  estateId: string;
  unitNumber: string;
  bedrooms: number;
  bathrooms: number;
  monthlyRent: string;
  depositAmount: string;
  unitType: string;
  floorArea: string;
  status: string;
  description: string;
}

interface CreateUnitResponse {
  success: boolean;
  message: string;
  data: Unit;
}

interface UnitsState {
  loading: boolean;
  error: string | null;
  success: boolean;
  createdUnit: Unit | null;
}

// Initial state
const initialState: UnitsState = {
  loading: false,
  error: null,
  success: false,
  createdUnit: null,
};

// Async thunk for creating a new unit
export const createUnit = createAsyncThunk<
  CreateUnitResponse,
  CreateUnitData,
  { rejectValue: string }
>("units/createUnit", async (unitData, { rejectWithValue }) => {
  try {
    const response = await api.post("unit", unitData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to create unit"
    );
  }
});

// Units slice
export const unitsSlice = createSlice({
  name: "units",
  initialState,
  reducers: {
    clearUnitsError: (state) => {
      state.error = null;
    },
    clearUnitsSuccess: (state) => {
      state.success = false;
      state.createdUnit = null;
    },
    resetUnitsState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.createdUnit = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create unit
      .addCase(createUnit.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.createdUnit = null;
      })
      .addCase(createUnit.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.createdUnit = action.payload.data;
      })
      .addCase(createUnit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create unit";
        state.success = false;
        state.createdUnit = null;
      });
  },
});

// Export actions
export const { clearUnitsError, clearUnitsSuccess, resetUnitsState } =
  unitsSlice.actions;


  // Selectors
export const selectUnitsLoading = (state: RootState) => state.units.loading;
export const selectUnitsError = (state: RootState) => state.units.error;
export const selectUnitsSuccess = (state: RootState) => state.units.success;
export const selectCreatedUnit = (state: RootState) => state.units.createdUnit;

export default unitsSlice;
