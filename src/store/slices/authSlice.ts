import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'hr' | 'manager' | 'employee';
  avatar?: string;
  companyId: string;
  employeeId?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('talenthr_user') || 'null'),
  isAuthenticated: Boolean(localStorage.getItem('talenthr_user')),
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      localStorage.setItem('talenthr_user', JSON.stringify(action.payload));
    },
    loginFailure: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      localStorage.removeItem('talenthr_user');
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('talenthr_user', JSON.stringify(state.user));
      }
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;