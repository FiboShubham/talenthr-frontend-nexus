import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: 'vacation' | 'sick' | 'personal' | 'emergency' | 'maternity' | 'paternity';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  comments?: string;
}

export interface LeaveBalance {
  employeeId: string;
  vacation: number;
  sick: number;
  personal: number;
  year: number;
}

interface LeaveState {
  requests: LeaveRequest[];
  balances: LeaveBalance[];
  loading: boolean;
  currentRequest: LeaveRequest | null;
}

const initialState: LeaveState = {
  requests: [],
  balances: [],
  loading: false,
  currentRequest: null,
};

const leaveSlice = createSlice({
  name: 'leave',
  initialState,
  reducers: {
    setLeaveRequests: (state, action: PayloadAction<LeaveRequest[]>) => {
      state.requests = action.payload;
    },
    addLeaveRequest: (state, action: PayloadAction<LeaveRequest>) => {
      state.requests.push(action.payload);
    },
    updateLeaveRequest: (state, action: PayloadAction<LeaveRequest>) => {
      const index = state.requests.findIndex(req => req.id === action.payload.id);
      if (index !== -1) {
        state.requests[index] = action.payload;
      }
    },
    deleteLeaveRequest: (state, action: PayloadAction<string>) => {
      state.requests = state.requests.filter(req => req.id !== action.payload);
    },
    setLeaveBalances: (state, action: PayloadAction<LeaveBalance[]>) => {
      state.balances = action.payload;
    },
    updateLeaveBalance: (state, action: PayloadAction<LeaveBalance>) => {
      const index = state.balances.findIndex(bal => bal.employeeId === action.payload.employeeId);
      if (index !== -1) {
        state.balances[index] = action.payload;
      } else {
        state.balances.push(action.payload);
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCurrentRequest: (state, action: PayloadAction<LeaveRequest | null>) => {
      state.currentRequest = action.payload;
    },
  },
});

export const {
  setLeaveRequests,
  addLeaveRequest,
  updateLeaveRequest,
  deleteLeaveRequest,
  setLeaveBalances,
  updateLeaveBalance,
  setLoading,
  setCurrentRequest,
} = leaveSlice.actions;

export default leaveSlice.reducer;