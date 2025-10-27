import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/axios/axios";
import type { RootState } from "@/store/store";

import type { Unit, CreateUnitData, CreateUnitResponse, VacantUnitsResponse,UnitsState } from "../types/unitSliceTypes";

// Initial state
const initialState: UnitsState = {
  loading: false,
  error: null,
  success: false,
  createdUnit: null,
  vacantUnits: [],
  vacantUnitsLoading: false,
  vacantUnitsError: null,
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

// Async thunk for getting vacant units for an owner
export const getOwnerVacantUnits = createAsyncThunk<
  VacantUnitsResponse,
  string,
  { rejectValue: string }
>("units/getOwnerVacantUnits", async (ownerId, { rejectWithValue }) => {
  try {
    const response = await api.get(`/unit/vacant/owner/${ownerId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch vacant units"
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
      state.vacantUnits = [];
      state.vacantUnitsLoading = false;
      state.vacantUnitsError = null;
    },
    clearVacantUnitsError: (state) => {
      state.vacantUnitsError = null;
    },
    clearVacantUnits: (state) => {
      state.vacantUnits = [];
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
      })
      // Get owner vacant units
      .addCase(getOwnerVacantUnits.pending, (state) => {
        state.vacantUnitsLoading = true;
        state.vacantUnitsError = null;
      })
      .addCase(getOwnerVacantUnits.fulfilled, (state, action) => {
        state.vacantUnitsLoading = false;
        state.vacantUnitsError = null;
        state.vacantUnits = action.payload.data;
      })
      .addCase(getOwnerVacantUnits.rejected, (state, action) => {
        state.vacantUnitsLoading = false;
        state.vacantUnitsError = action.payload || "Failed to fetch vacant units";
        state.vacantUnits = [];
      });
  },
});

// Export actions
export const { 
  clearUnitsError, 
  clearUnitsSuccess, 
  resetUnitsState,
  clearVacantUnitsError,
  clearVacantUnits,
} = unitsSlice.actions;

// Selectors
export const selectUnitsLoading = (state: RootState) => state.units.loading;
export const selectUnitsError = (state: RootState) => state.units.error;
export const selectUnitsSuccess = (state: RootState) => state.units.success;
export const selectCreatedUnit = (state: RootState) => state.units.createdUnit;

// Vacant units selectors
export const selectVacantUnits = (state: RootState) => state.units.vacantUnits;
export const selectVacantUnitsLoading = (state: RootState) => state.units.vacantUnitsLoading;
export const selectVacantUnitsError = (state: RootState) => state.units.vacantUnitsError;

// Derived selectors for vacant units
export const selectVacantUnitsCount = (state: RootState) => state.units.vacantUnits.length;

export const selectVacantUnitsByEstate = (state: RootState) => {
  const unitsByEstate: { [estateId: string]: Unit[] } = {};
  state.units.vacantUnits.forEach(unit => {
    if (!unitsByEstate[unit.estate.id]) {
      unitsByEstate[unit.estate.id] = [];
    }
    unitsByEstate[unit.estate.id].push(unit);
  });
  return unitsByEstate;
};

export const selectUniqueEstates = (state: RootState) => {
  const estates = state.units.vacantUnits.map(unit => unit.estate);
  return Array.from(new Map(estates.map(estate => [estate.id, estate])).values());
};

export const selectVacantUnitsStats = (state: RootState) => {
  const vacantUnits = state.units.vacantUnits;
  return {
    total: vacantUnits.length,
    totalEstates: selectUniqueEstates(state).length,
    averageRent: vacantUnits.length > 0 
      ? vacantUnits.reduce((sum, unit) => sum + parseFloat(unit.monthlyRent), 0) / vacantUnits.length 
      : 0,
    totalBedrooms: vacantUnits.reduce((sum, unit) => sum + unit.bedrooms, 0),
  };
};

export default unitsSlice;