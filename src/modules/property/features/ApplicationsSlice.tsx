import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import api from "@/axios/axios";
import type {
  ApplicationsState,
  Application,
  ApplicationsResponse,
  ApplicationStats,
  UpdateApplicationStatusPayload,
} from "../types/applicationTypes";

// Initial state
const initialState: ApplicationsState = {
  applications: [],
  applicationStats: null,
  selectedApplication: null,
  loading: false,
  error: null,
  pagination: {
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
    hasNext: false,
    hasPrevious: false,
  },
};

// Async thunks
export const fetchOwnerApplications = createAsyncThunk(
  "applications/fetchOwnerApplications",
  async (
    {
      page = 1,
      limit = 10,
      status,
    }: { page?: number; limit?: number; status?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get(`/estates/applications/owner`, {
        params: { page, limit, status },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch applications"
      );
    }
  }
);

export const fetchApplicationStats = createAsyncThunk(
  "applications/fetchApplicationStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/estates/applications/owner/stats");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch application stats"
      );
    }
  }
);

export const fetchApplicationById = createAsyncThunk(
  "applications/fetchApplicationById",
  async (applicationId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/estates/applications/owner/${applicationId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch application"
      );
    }
  }
);

export const updateApplicationStatus = createAsyncThunk(
  "applications/updateApplicationStatus",
  async (
    { applicationId, status, rejectionReason }: UpdateApplicationStatusPayload,
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(
        `/estates/applications/owner/${applicationId}/status`,
        {
          status,
          rejectionReason,
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update application status"
      );
    }
  }
);

export const fetchEstateApplications = createAsyncThunk(
  "applications/fetchEstateApplications",
  async (
    {
      estateId,
      page = 1,
      limit = 10,
    }: { estateId: string; page?: number; limit?: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get(`/estates/${estateId}/applications`, {
        params: { page, limit },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch estate applications"
      );
    }
  }
);

// Slice
export const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    clearApplications: (state) => {
      state.applications = [];
      state.pagination = initialState.pagination;
    },
    clearSelectedApplication: (state) => {
      state.selectedApplication = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setApplicationsPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch owner applications
      .addCase(fetchOwnerApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOwnerApplications.fulfilled,
        (state, action: PayloadAction<ApplicationsResponse>) => {
          state.loading = false;
          state.applications = action.payload.applications;
          state.pagination = {
            totalCount: action.payload.totalCount,
            totalPages: action.payload.totalPages,
            currentPage: action.payload.currentPage,
            hasNext: action.payload.hasNext,
            hasPrevious: action.payload.hasPrevious,
          };
        }
      )
      .addCase(fetchOwnerApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch application stats
      .addCase(fetchApplicationStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchApplicationStats.fulfilled,
        (state, action: PayloadAction<{ data: ApplicationStats }>) => {
          state.loading = false;
          state.applicationStats = action.payload.data;
        }
      )
      .addCase(fetchApplicationStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch application by ID
      .addCase(fetchApplicationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchApplicationById.fulfilled,
        (state, action: PayloadAction<{ data: Application }>) => {
          state.loading = false;
          state.selectedApplication = action.payload.data;
        }
      )
      .addCase(fetchApplicationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update application status
      .addCase(updateApplicationStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateApplicationStatus.fulfilled,
        (
          state,
          action: PayloadAction<{ data: Application; message: string }>
        ) => {
          state.loading = false;

          // Update the application in the list if it exists
          const updatedApplication = action.payload.data;
          const index = state.applications.findIndex(
            (app) => app.id === updatedApplication.id
          );
          if (index !== -1) {
            state.applications[index] = updatedApplication;
          }

          // Update selected application if it's the one being updated
          if (
            state.selectedApplication &&
            state.selectedApplication.id === updatedApplication.id
          ) {
            state.selectedApplication = updatedApplication;
          }
        }
      )
      .addCase(updateApplicationStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch estate applications
      .addCase(fetchEstateApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchEstateApplications.fulfilled,
        (state, action: PayloadAction<ApplicationsResponse>) => {
          state.loading = false;
          state.applications = action.payload.applications;
          state.pagination = {
            totalCount: action.payload.totalCount,
            totalPages: action.payload.totalPages,
            currentPage: action.payload.currentPage,
            hasNext: action.payload.hasNext,
            hasPrevious: action.payload.hasPrevious,
          };
        }
      )
      .addCase(fetchEstateApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const {
  clearApplications,
  clearSelectedApplication,
  clearError,
  setApplicationsPage,
} = applicationsSlice.actions;

export default applicationsSlice;
