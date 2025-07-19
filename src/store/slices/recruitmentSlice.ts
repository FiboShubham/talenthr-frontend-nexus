import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  experience: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  benefits: string[];
  status: 'draft' | 'active' | 'closed' | 'on-hold';
  postedDate: string;
  closingDate?: string;
  applicationCount: number;
  hiringManager: string;
}

export interface Candidate {
  id: string;
  jobId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  resumeUrl?: string;
  coverLetter?: string;
  status: 'applied' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  appliedDate: string;
  source: 'website' | 'referral' | 'linkedin' | 'other';
  notes: {
    id: string;
    content: string;
    createdBy: string;
    createdDate: string;
  }[];
  interviews: {
    id: string;
    type: 'phone' | 'video' | 'in-person' | 'technical';
    date: string;
    interviewer: string;
    feedback?: string;
    rating?: number;
  }[];
}

interface RecruitmentState {
  jobPostings: JobPosting[];
  candidates: Candidate[];
  currentJob: JobPosting | null;
  currentCandidate: Candidate | null;
  loading: boolean;
}

const initialState: RecruitmentState = {
  jobPostings: [],
  candidates: [],
  currentJob: null,
  currentCandidate: null,
  loading: false,
};

const recruitmentSlice = createSlice({
  name: 'recruitment',
  initialState,
  reducers: {
    setJobPostings: (state, action: PayloadAction<JobPosting[]>) => {
      state.jobPostings = action.payload;
    },
    addJobPosting: (state, action: PayloadAction<JobPosting>) => {
      state.jobPostings.push(action.payload);
    },
    updateJobPosting: (state, action: PayloadAction<JobPosting>) => {
      const index = state.jobPostings.findIndex(job => job.id === action.payload.id);
      if (index !== -1) {
        state.jobPostings[index] = action.payload;
      }
    },
    deleteJobPosting: (state, action: PayloadAction<string>) => {
      state.jobPostings = state.jobPostings.filter(job => job.id !== action.payload);
    },
    setCandidates: (state, action: PayloadAction<Candidate[]>) => {
      state.candidates = action.payload;
    },
    addCandidate: (state, action: PayloadAction<Candidate>) => {
      state.candidates.push(action.payload);
    },
    updateCandidate: (state, action: PayloadAction<Candidate>) => {
      const index = state.candidates.findIndex(candidate => candidate.id === action.payload.id);
      if (index !== -1) {
        state.candidates[index] = action.payload;
      }
    },
    deleteCandidate: (state, action: PayloadAction<string>) => {
      state.candidates = state.candidates.filter(candidate => candidate.id !== action.payload);
    },
    setCurrentJob: (state, action: PayloadAction<JobPosting | null>) => {
      state.currentJob = action.payload;
    },
    setCurrentCandidate: (state, action: PayloadAction<Candidate | null>) => {
      state.currentCandidate = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setJobPostings,
  addJobPosting,
  updateJobPosting,
  deleteJobPosting,
  setCandidates,
  addCandidate,
  updateCandidate,
  deleteCandidate,
  setCurrentJob,
  setCurrentCandidate,
  setLoading,
} = recruitmentSlice.actions;

export default recruitmentSlice.reducer;