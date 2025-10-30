// User type
export interface IUser {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phone?: string;
  idNumber?: string;
  status?: string;
  approvalStatus?: string;
}

// Auth State
export interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Register payload
export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  idNumber: string;
  role: string;
  status?: string;
}

// Response from backend (tokens in HTTP-only cookies)
export interface AuthResponse {
  user: IUser;
}

// Initial state
export const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};
