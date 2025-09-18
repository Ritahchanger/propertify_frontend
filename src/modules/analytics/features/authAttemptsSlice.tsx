import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import api from "@/axios/axios";

export type Attempt = {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    ipAddress: string;
    userAgent: string;
    attemptType: string;
    status: "success" | "failed";
    reason?: string;
    createdAt: string;
};

export type AuthAttemptsState = {
    attempts: Attempt[];
    loading: boolean;
    error: string | null;
};

const initialState: AuthAttemptsState = {
    attempts: [],
    loading: false,
    error: null,
};

export const fetchAuthAttempts = createAsyncThunk<
    Attempt[],
    void,
    { rejectValue: string }
>("authAttempts/fetch", async (_, thunkAPI) => {
    try {
        const response = await api.get<{ attempts: Attempt[] }>("auth/attempts");
        return response.data.attempts; // ✅ unwrap array
    } catch (err: any) {
        return thunkAPI.rejectWithValue(
            err.response?.data?.message || "Failed to fetch attempts"
        );
    }
});

export const authAttemptsSlice = createSlice({
    name: "authAttempts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuthAttempts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAuthAttempts.fulfilled,
                (state, action: PayloadAction<Attempt[]>) => {
                    state.loading = false;
                    state.attempts = action.payload;
                }
            )
            .addCase(fetchAuthAttempts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export default authAttemptsSlice;
