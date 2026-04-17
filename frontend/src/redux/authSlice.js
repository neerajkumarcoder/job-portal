import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
  },
  reducers: {
    // Actions
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    // 👇 Ye naya action add karna hai Logout ke liye
    clearAuthUser: (state) => {
      state.user = null;
    },
  },
});

// 👇 Naye action 'clearAuthUser' ko yahan export karna mat bhoolna
export const { setLoading, setUser, clearAuthUser } = authSlice.actions;
export default authSlice.reducer;
