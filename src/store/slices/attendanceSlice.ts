import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  clockIn?: string;
  clockOut?: string;
  breakStart?: string;
  breakEnd?: string;
  totalHours?: number;
  overtime?: number;
  status: 'present' | 'absent' | 'late' | 'half-day' | 'holiday';
  notes?: string;
}

interface AttendanceState {
  records: AttendanceRecord[];
  todayRecord: AttendanceRecord | null;
  loading: boolean;
  isClockedIn: boolean;
  isOnBreak: boolean;
}

const initialState: AttendanceState = {
  records: [],
  todayRecord: null,
  loading: false,
  isClockedIn: false,
  isOnBreak: false,
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    setAttendanceRecords: (state, action: PayloadAction<AttendanceRecord[]>) => {
      state.records = action.payload;
    },
    addAttendanceRecord: (state, action: PayloadAction<AttendanceRecord>) => {
      state.records.push(action.payload);
    },
    updateAttendanceRecord: (state, action: PayloadAction<AttendanceRecord>) => {
      const index = state.records.findIndex(record => record.id === action.payload.id);
      if (index !== -1) {
        state.records[index] = action.payload;
      }
    },
    setTodayRecord: (state, action: PayloadAction<AttendanceRecord | null>) => {
      state.todayRecord = action.payload;
      if (action.payload) {
        state.isClockedIn = Boolean(action.payload.clockIn && !action.payload.clockOut);
        state.isOnBreak = Boolean(action.payload.breakStart && !action.payload.breakEnd);
      }
    },
    clockIn: (state, action: PayloadAction<{ employeeId: string; time: string }>) => {
      const today = new Date().toISOString().split('T')[0];
      const newRecord: AttendanceRecord = {
        id: Date.now().toString(),
        employeeId: action.payload.employeeId,
        employeeName: '',
        date: today,
        clockIn: action.payload.time,
        status: 'present',
      };
      state.todayRecord = newRecord;
      state.isClockedIn = true;
      state.records.push(newRecord);
    },
    clockOut: (state, action: PayloadAction<string>) => {
      if (state.todayRecord) {
        state.todayRecord.clockOut = action.payload;
        state.isClockedIn = false;
        state.isOnBreak = false;
        
        // Calculate total hours
        if (state.todayRecord.clockIn) {
          const clockIn = new Date(`2000-01-01 ${state.todayRecord.clockIn}`);
          const clockOut = new Date(`2000-01-01 ${action.payload}`);
          const diffMs = clockOut.getTime() - clockIn.getTime();
          state.todayRecord.totalHours = Math.round((diffMs / (1000 * 60 * 60)) * 100) / 100;
        }
        
        const index = state.records.findIndex(record => record.id === state.todayRecord?.id);
        if (index !== -1) {
          state.records[index] = state.todayRecord;
        }
      }
    },
    startBreak: (state, action: PayloadAction<string>) => {
      if (state.todayRecord) {
        state.todayRecord.breakStart = action.payload;
        state.isOnBreak = true;
      }
    },
    endBreak: (state, action: PayloadAction<string>) => {
      if (state.todayRecord) {
        state.todayRecord.breakEnd = action.payload;
        state.isOnBreak = false;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setAttendanceRecords,
  addAttendanceRecord,
  updateAttendanceRecord,
  setTodayRecord,
  clockIn,
  clockOut,
  startBreak,
  endBreak,
  setLoading,
} = attendanceSlice.actions;

export default attendanceSlice.reducer;