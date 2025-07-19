import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  period: string; // YYYY-MM
  basicSalary: number;
  allowances: {
    house: number;
    transport: number;
    medical: number;
    other: number;
  };
  deductions: {
    tax: number;
    insurance: number;
    pension: number;
    other: number;
  };
  overtime: {
    hours: number;
    rate: number;
    amount: number;
  };
  bonus: number;
  netSalary: number;
  status: 'draft' | 'processed' | 'paid';
  payDate?: string;
  createdDate: string;
}

export interface Payslip {
  id: string;
  payrollRecordId: string;
  employeeId: string;
  employeeName: string;
  period: string;
  payDate: string;
  earnings: {
    basicSalary: number;
    allowances: number;
    overtime: number;
    bonus: number;
    total: number;
  };
  deductions: {
    tax: number;
    insurance: number;
    pension: number;
    other: number;
    total: number;
  };
  netPay: number;
}

interface PayrollState {
  payrollRecords: PayrollRecord[];
  payslips: Payslip[];
  currentRecord: PayrollRecord | null;
  loading: boolean;
}

const initialState: PayrollState = {
  payrollRecords: [],
  payslips: [],
  currentRecord: null,
  loading: false,
};

const payrollSlice = createSlice({
  name: 'payroll',
  initialState,
  reducers: {
    setPayrollRecords: (state, action: PayloadAction<PayrollRecord[]>) => {
      state.payrollRecords = action.payload;
    },
    addPayrollRecord: (state, action: PayloadAction<PayrollRecord>) => {
      state.payrollRecords.push(action.payload);
    },
    updatePayrollRecord: (state, action: PayloadAction<PayrollRecord>) => {
      const index = state.payrollRecords.findIndex(record => record.id === action.payload.id);
      if (index !== -1) {
        state.payrollRecords[index] = action.payload;
      }
    },
    deletePayrollRecord: (state, action: PayloadAction<string>) => {
      state.payrollRecords = state.payrollRecords.filter(record => record.id !== action.payload);
    },
    setPayslips: (state, action: PayloadAction<Payslip[]>) => {
      state.payslips = action.payload;
    },
    addPayslip: (state, action: PayloadAction<Payslip>) => {
      state.payslips.push(action.payload);
    },
    setCurrentRecord: (state, action: PayloadAction<PayrollRecord | null>) => {
      state.currentRecord = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setPayrollRecords,
  addPayrollRecord,
  updatePayrollRecord,
  deletePayrollRecord,
  setPayslips,
  addPayslip,
  setCurrentRecord,
  setLoading,
} = payrollSlice.actions;

export default payrollSlice.reducer;