import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  manager?: string;
  hireDate: string;
  status: 'active' | 'inactive' | 'terminated';
  salary?: number;
  avatar?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  documents?: {
    id: string;
    name: string;
    type: string;
    url: string;
    uploadDate: string;
  }[];
}

interface EmployeeState {
  employees: Employee[];
  currentEmployee: Employee | null;
  loading: boolean;
  searchTerm: string;
  filters: {
    department?: string;
    status?: string;
    manager?: string;
  };
}

const initialState: EmployeeState = {
  employees: [],
  currentEmployee: null,
  loading: false,
  searchTerm: '',
  filters: {},
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setEmployees: (state, action: PayloadAction<Employee[]>) => {
      state.employees = action.payload;
    },
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
    },
    updateEmployee: (state, action: PayloadAction<Employee>) => {
      const index = state.employees.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
    deleteEmployee: (state, action: PayloadAction<string>) => {
      state.employees = state.employees.filter(emp => emp.id !== action.payload);
    },
    setCurrentEmployee: (state, action: PayloadAction<Employee | null>) => {
      state.currentEmployee = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<EmployeeState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {};
      state.searchTerm = '';
    },
  },
});

export const {
  setEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  setCurrentEmployee,
  setLoading,
  setSearchTerm,
  setFilters,
  clearFilters,
} = employeeSlice.actions;

export default employeeSlice.reducer;