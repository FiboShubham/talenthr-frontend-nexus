import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import employeeReducer from './slices/employeeSlice';
import leaveReducer from './slices/leaveSlice';
import attendanceReducer from './slices/attendanceSlice';
import payrollReducer from './slices/payrollSlice';
import recruitmentReducer from './slices/recruitmentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
    leave: leaveReducer,
    attendance: attendanceReducer,
    payroll: payrollReducer,
    recruitment: recruitmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;