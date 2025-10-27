import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/axios/axios";

import { initialState, type ApiResponse } from "../types/tenants-slice";

// Async thunk to get all tenants
export const getAllTenants = createAsyncThunk(
  "tenants/getAllTenants",
  async (params: { page?: number; limit?: number; status?: string } = {}) => {
    const { page = 1, limit = 10, status } = params;

    const response = await api.get<ApiResponse>("/tenant/", {
      params: { page, limit, status },
    });

    return response.data.data;
  }
);

// Tenants slice
const tenantsSlice = createSlice({
  name: "tenants",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearTenants: (state) => {
      state.tenants = [];
      state.totalCount = 0;
      state.totalPages = 0;
      state.currentPage = 1;
      state.hasNext = false;
      state.hasPrevious = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTenants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTenants.fulfilled, (state, action) => {
        state.loading = false;
        state.tenants = action.payload.tenants;
        state.totalCount = action.payload.totalCount;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.hasNext = action.payload.hasNext;
        state.hasPrevious = action.payload.hasPrevious;
      })
      .addCase(getAllTenants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tenants";
      });
  },
});

export const { clearError, clearTenants } = tenantsSlice.actions;
export default tenantsSlice;
