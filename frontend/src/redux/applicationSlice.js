import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    applicants: [],
  },
  reducers: {
    setAllApplicants: (state, action) => {
      state.applicants = action.payload;
    },
    // 👇 NAYA REDUCER: Logout par applicants ka data hatane ke liye
    clearApplicationState: (state) => {
      state.applicants = [];
    },
  },
});

export const {
  setAllApplicants,
  clearApplicationState, // 👇 Ise export karna mat bhoolna
} = applicationSlice.actions;

export default applicationSlice.reducer;
