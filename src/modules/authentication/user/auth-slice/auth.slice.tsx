import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type { AuthState, AuthResponse, RegisterPayload } from "./types";

import api from "@/axios/axios";

// Async thunk for registration
export const registerUser = createAsyncThunk<
  AuthResponse,
  RegisterPayload,
  { rejectValue: string }
>("auth/registerUser", async (payload, thunkAPI) => {
  try {
    const response = await api.post<AuthResponse>(`auth/register`, payload);
    if (typeof window !== "undefined") {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Registration failed"
    );
  }
});

// Async thunk for login
export const loginUser = createAsyncThunk<
  AuthResponse,
  { email: string; password: string },
  { rejectValue: string }
>("auth/loginUser", async (payload, thunkAPI) => {
  try {
    const response = await api.post<AuthResponse>(`auth/login/`, payload);

    if (typeof window !== "undefined") {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Login failed"
    );
  }
});

// Async thunk for logout
export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logoutUser",
  async (_, thunkAPI: any) => {
    try {
      await api.post(`auth/logout/`, {});

      console.log("loggout called");

      if (typeof window !== "undefined") {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user");
      }
      return true;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Logout failed"
      );
    }
  }
);

// Slice
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  } as AuthState,
  reducers: {
    loadUserFromStorage: (state) => {
      if (typeof window !== "undefined") {
        const user = localStorage.getItem("user");
        const isAuthenticated = localStorage.getItem("isAuthenticated");
        if (user && isAuthenticated === "true") {
          state.user = JSON.parse(user);
          state.isAuthenticated = true;
        }
      }
    },
    getUserId: (state) => {
      if (state.user && "id" in state.user) {
        return state.user.id;
      }
      if (typeof window !== "undefined") {
        const user = localStorage.getItem("user");
        if (user) {
          const userData = JSON.parse(user);
          if (userData && userData.id) {
            return userData.id;
          }
        }
      }
      return null;
    },
    setUserIdFromStorage: (state) => {
      if (typeof window !== "undefined") {
        const user = localStorage.getItem("user");
        if (user) {
          const userData = JSON.parse(user);
          if (userData && userData.id) {
            return userData.id;
          }
        }
      }
      return null;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetLoading: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.isAuthenticated = true;
          state.error = null;
          if (typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("isAuthenticated", "true");
          }
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
        state.isAuthenticated = false;
        state.user = null;

        if (typeof window !== "undefined") {
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("user");
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.isAuthenticated = true;
          state.error = null;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Logout failed";
      });
  },
});

export const {
  loadUserFromStorage,
  getUserId,
  setUserIdFromStorage,
  clearError,
  resetLoading,
} = authSlice.actions;
export const selectUserId = (state: { auth: AuthState }) => {
  return state.auth.user?.id || null;
};
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;

export const selectRegistrationLoading = (state: { auth: AuthState }) =>
  state.auth.loading;

export const selectRegistrationError = (state: { auth: AuthState }) =>
  state.auth.error;

export default authSlice;
