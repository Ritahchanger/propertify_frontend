import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import api from "@/axios/axios";
import type { RootState } from "@/store/store";
import type { EstatesResponse, EstateDropdownItem } from "../types/EstateSlice";
import { initialState } from "../types/EstateSlice";
import type { Estate } from "../types/EstateSlice";

// Async thunk for fetching user estates
export const fetchUserEstates = createAsyncThunk<
  EstatesResponse,
  { userId: string; page?: number; limit?: number },
  { rejectValue: string }
>(
  "estates/fetchUserEstates",
  async ({ userId, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await api.get(`estates/owner/${userId}`, {
        params: { page, limit },
      });
      console.log("Fetched estates:", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch estates"
      );
    }
  }
);

// Async thunk for fetching estate names for dropdown
export const fetchEstateNamesForDropdown = createAsyncThunk<
  EstateDropdownItem[], // Array of { id: string; name: string }
  string, // ownerId
  { rejectValue: string }
>(
  "estates/fetchEstateNamesForDropdown",
  async (ownerId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/estates/names/${ownerId}`);
      return response.data; // Should return array of { id, name }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch estate names"
      );
    }
  }
);

// Estate slice
export const estatesSlice = createSlice({
  name: "estates",
  initialState: {
    ...initialState,
    estateNames: [] as EstateDropdownItem[], // Add estateNames for dropdown
    estateNamesLoading: false,
    estateNamesError: null as string | null,
  },
  reducers: {
    clearEstates: (state) => {
      state.estates = [];
      state.totalCount = 0;
      state.totalPages = 0;
      state.currentPage = 1;
      state.hasNext = false;
      state.hasPrevious = false;
      state.error = null;
    },
    clearEstateNames: (state) => {
      state.estateNames = [];
      state.estateNamesError = null;
    },
    updateEstateStatus: (
      state,
      action: PayloadAction<{ id: string; status: Estate["status"] }>
    ) => {
      const estate = state.estates.find(
        (estate) => estate.id === action.payload.id
      );
      if (estate) {
        estate.status = action.payload.status;
        estate.updated_at = new Date().toISOString();
      }
    },
    addEstate: (state, action: PayloadAction<Estate>) => {
      state.estates.unshift(action.payload);
      state.totalCount += 1;

      // Also add to estateNames if not already present
      const exists = state.estateNames.find(
        (estate) => estate.id === action.payload.id
      );
      if (!exists) {
        state.estateNames.push({
          id: action.payload.id,
          name: action.payload.name,
        });
      }
    },
    removeEstate: (state, action: PayloadAction<string>) => {
      state.estates = state.estates.filter(
        (estate) => estate.id !== action.payload
      );
      state.totalCount = Math.max(0, state.totalCount - 1);

      // Also remove from estateNames
      state.estateNames = state.estateNames.filter(
        (estate) => estate.id !== action.payload
      );
    },
    clearError: (state) => {
      state.error = null;
      state.estateNamesError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user estates
      .addCase(fetchUserEstates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserEstates.fulfilled, (state, action) => {
        state.loading = false;
        state.estates = action.payload.estates;
        state.totalCount = action.payload.totalCount;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.hasNext = action.payload.hasNext;
        state.hasPrevious = action.payload.hasPrevious;
        state.error = null;

        // Update estateNames from the full estates data
        if (action.payload.estates && action.payload.estates.length > 0) {
          state.estateNames = action.payload.estates.map((estate) => ({
            id: estate.id,
            name: estate.name,
          }));
        }
      })
      .addCase(fetchUserEstates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch estates";
        state.estates = [];
        state.totalCount = 0;
        state.totalPages = 0;
        state.currentPage = 1;
        state.hasNext = false;
        state.hasPrevious = false;
      })
      // Fetch estate names for dropdown
      .addCase(fetchEstateNamesForDropdown.pending, (state) => {
        state.estateNamesLoading = true;
        state.estateNamesError = null;
      })
      .addCase(fetchEstateNamesForDropdown.fulfilled, (state, action) => {
        state.estateNamesLoading = false;
        state.estateNames = action.payload;
        state.estateNamesError = null;
      })
      .addCase(fetchEstateNamesForDropdown.rejected, (state, action) => {
        state.estateNamesLoading = false;
        state.estateNamesError =
          action.payload || "Failed to fetch estate names";
        state.estateNames = [];
      });
  },
});

// Export actions
export const {
  clearEstates,
  clearEstateNames,
  updateEstateStatus,
  addEstate,
  removeEstate,
  clearError,
} = estatesSlice.actions;

// Selectors
export const selectEstates = (state: RootState) => state.estates.estates;
export const selectEstatesLoading = (state: RootState) => state.estates.loading;
export const selectEstatesError = (state: RootState) => state.estates.error;

// Estate names selectors for dropdown
export const selectEstateNames = (state: RootState) =>
  state.estates.estateNames;
export const selectEstateNamesLoading = (state: RootState) =>
  state.estates.estateNamesLoading;
export const selectEstateNamesError = (state: RootState) =>
  state.estates.estateNamesError;

// Formatted estate names for dropdown components
export const selectEstateNamesForDropdown = (state: RootState) =>
  state.estates.estateNames.map((estate) => ({
    value: estate.id,
    label: estate.name,
  }));

export const selectEstatesPagination = (state: RootState) => ({
  totalCount: state.estates.totalCount,
  totalPages: state.estates.totalPages,
  currentPage: state.estates.currentPage,
  hasNext: state.estates.hasNext,
  hasPrevious: state.estates.hasPrevious,
});

// Selector for estate by ID
export const selectEstateById = (id: string) => (state: RootState) =>
  state.estates.estates.find((estate) => estate.id === id);

// Selector for estates statistics
export const selectEstatesStats = (state: RootState) => {
  const estates = state.estates.estates;
  const totalProperties = estates.length;
  const totalUnits = estates.reduce(
    (sum, estate) => sum + estate.totalUnits,
    0
  );

  // Calculate occupied units from units array
  const totalOccupied = estates.reduce((sum, estate) => {
    const occupiedUnits = estate.units.filter(
      (unit) => unit.status === "occupied"
    ).length;
    return sum + occupiedUnits;
  }, 0);

  // Calculate total monthly revenue
  const totalRevenue = estates.reduce((sum, estate) => {
    const estateRevenue = estate.units
      .filter((unit) => unit.status === "occupied")
      .reduce((unitSum, unit) => unitSum + parseFloat(unit.monthlyRent), 0);
    return sum + estateRevenue;
  }, 0);

  const totalMaintenanceRequests = estates.reduce((sum, estate) => {
    return sum + (estate.status === "maintenance" ? 1 : 0);
  }, 0);

  const occupancyRate =
    totalUnits > 0 ? Math.round((totalOccupied / totalUnits) * 100) : 0;

  return {
    totalProperties,
    totalUnits,
    totalOccupied,
    totalRevenue,
    totalMaintenanceRequests,
    occupancyRate,
  };
};

export default estatesSlice;
