import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null,
    companies: [],
    searchCompanyByText: "",
  },
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setSearchCompanyByText: (state, action) => {
      state.searchCompanyByText = action.payload;
    },
    // 👇 NAYA REDUCER: Logout par companies ka data hatane ke liye
    clearCompanyState: (state) => {
      state.singleCompany = null;
      state.companies = []; // Array ko wapas khali kar diya
      state.searchCompanyByText = "";
    },
  },
});

export const {
  setSingleCompany,
  setCompanies,
  setSearchCompanyByText,
  clearCompanyState, // 👇 Ise yahan export karna zaroori hai
} = companySlice.actions;

export default companySlice.reducer;
