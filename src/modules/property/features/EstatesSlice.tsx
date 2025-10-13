import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import api from "@/axios/axios";

import type { RootState } from "@/store/store";

// Types
interface Owner {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
}

interface Unit {
  id: string;
  unitNumber: string;
  status: string;
  monthlyRent: string;
  bedrooms: number;
  bathrooms: number;
}

interface Estate {
  id: string;
  ownerId: string;
  name: string;
  location: string;
  description: string;
  totalUnits: number;
  status: "active" | "maintenance" | "inactive";
  created_at: string;
  updated_at: string;
  owner: Owner;
  units: Unit[];
}

interface EstatesResponse {
  success: boolean;
  estates: Estate[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

interface EstatesState {
  estates: Estate[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Initial state
const initialState: EstatesState = {
  estates: [],
  loading: false,
  error: null,
  totalCount: 0,
  totalPages: 0,
  currentPage: 1,
  hasNext: false,
  hasPrevious: false,
};

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

// Estate slice
export const estatesSlice = createSlice({
  name: "estates",
  initialState,
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
    },
    removeEstate: (state, action: PayloadAction<string>) => {
      state.estates = state.estates.filter(
        (estate) => estate.id !== action.payload
      );
      state.totalCount = Math.max(0, state.totalCount - 1);
    },
    clearError: (state) => {
      state.error = null;
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
      });
  },
});



// Export actions
export const {
  clearEstates,
  updateEstateStatus,
  addEstate,
  removeEstate,
  clearError,
} = estatesSlice.actions;

// Selectors



export const selectEstates = (state: RootState) => state.estates.estates;
export const selectEstatesLoading = (state: RootState) => state.estates.loading;
export const selectEstatesError = (state: RootState) => state.estates.error;
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

export default estatesSlice.reducer;
