import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import api from "@/axios/axios";
import { selectUserId } from "@/modules/authentication/user/auth-slice/auth.slice";

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
  owner: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
  };
  units: Array<{
    id: string;
    unitNumber: string;
    status: string;
    monthlyRent: string;
    bedrooms: number;
    bathrooms: number;
  }>;
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

// Async thunk to fetch owner's estates
export const fetchOwnerEstates = createAsyncThunk(
  "estates/fetchOwnerEstates",
  async (
    params: { page?: number; limit?: number } = {},
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as any;
      const ownerId = selectUserId(state);

      if (!ownerId) {
        return rejectWithValue("User not authenticated");
      }

      const { page = 1, limit = 10 } = params;
      const response = await api.get<EstatesResponse>(
        `/estates/owner/${ownerId}/paginated?page=${page}&limit=${limit}`
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch estates"
      );
    }
  }
);

// Async thunk to fetch all owner's estates (without pagination) - FIXED
export const fetchAllOwnerEstates = createAsyncThunk(
  "estates/fetchAllOwnerEstates",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as any;
      const ownerId = selectUserId(state);

      if (!ownerId) {
        return rejectWithValue("User not authenticated");
      }

      const response = await api.get<{
        success: boolean;
        estates: Estate[];
        totalCount: number;
        totalPages: number;
        currentPage: number;
        hasNext: boolean;
        hasPrevious: boolean;
      }>(`/estates/owner/${ownerId}`);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch estates"
      );
    }
  }
);

// Async thunk to fetch estates with statistics - FIXED
export const fetchOwnerEstatesWithStats = createAsyncThunk(
  "estates/fetchOwnerEstatesWithStats",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as any;
      const ownerId = selectUserId(state);

      if (!ownerId) {
        return rejectWithValue("User not authenticated");
      }

      const response = await api.get<{
        success: boolean;
        estates: Estate[];
        totalCount: number;
      }>(`/estates/owner/${ownerId}/stats`);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch estates with stats"
      );
    }
  }
);

const estatesSlice = createSlice({
  name: "estates",
  initialState,
  reducers: {
    clearEstates: (state) => {
      state.estates = [];
      state.error = null;
      state.totalCount = 0;
      state.totalPages = 0;
      state.currentPage = 1;
      state.hasNext = false;
      state.hasPrevious = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch owner's estates (paginated)
      .addCase(fetchOwnerEstates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOwnerEstates.fulfilled,
        (state, action: PayloadAction<EstatesResponse>) => {
          state.loading = false;
          state.estates = action.payload.estates;
          state.totalCount = action.payload.totalCount;
          state.totalPages = action.payload.totalPages;
          state.currentPage = action.payload.currentPage;
          state.hasNext = action.payload.hasNext;
          state.hasPrevious = action.payload.hasPrevious;
          state.error = null;
        }
      )
      .addCase(fetchOwnerEstates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.estates = [];
      })

      // Fetch all owner's estates - FIXED
      .addCase(fetchAllOwnerEstates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllOwnerEstates.fulfilled,
        (
          state,
          action: PayloadAction<{
            success: boolean;
            estates: Estate[];
            totalCount: number;
            totalPages: number;
            currentPage: number;
            hasNext: boolean;
            hasPrevious: boolean;
          }>
        ) => {
          state.loading = false;
          state.estates = action.payload.estates;
          state.totalCount = action.payload.totalCount;
          state.totalPages = action.payload.totalPages;
          state.currentPage = action.payload.currentPage;
          state.hasNext = action.payload.hasNext;
          state.hasPrevious = action.payload.hasPrevious;
          state.error = null;
        }
      )
      .addCase(fetchAllOwnerEstates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.estates = [];
      })

      // Fetch owner's estates with stats - FIXED
      .addCase(fetchOwnerEstatesWithStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOwnerEstatesWithStats.fulfilled,
        (
          state,
          action: PayloadAction<{
            success: boolean;
            estates: Estate[];
            totalCount: number;
          }>
        ) => {
          state.loading = false;
          state.estates = action.payload.estates;
          state.totalCount = action.payload.totalCount;
          state.totalPages = 1;
          state.currentPage = 1;
          state.hasNext = false;
          state.hasPrevious = false;
          state.error = null;
        }
      )
      .addCase(fetchOwnerEstatesWithStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.estates = [];
      });
  },
});

export const { clearEstates, clearError, setCurrentPage } =
  estatesSlice.actions;

// Selectors
export const selectEstates = (state: { estates: EstatesState }) =>
  state.estates.estates;
export const selectEstatesLoading = (state: { estates: EstatesState }) =>
  state.estates.loading;
export const selectEstatesError = (state: { estates: EstatesState }) =>
  state.estates.error;
export const selectEstatesPagination = (state: { estates: EstatesState }) => ({
  totalCount: state.estates.totalCount,
  totalPages: state.estates.totalPages,
  currentPage: state.estates.currentPage,
  hasNext: state.estates.hasNext,
  hasPrevious: state.estates.hasPrevious,
});

export default estatesSlice;
