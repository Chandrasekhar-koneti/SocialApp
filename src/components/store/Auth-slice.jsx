import { createSlice } from "@reduxjs/toolkit";

const initialAuthStatus = {
  token: localStorage.getItem("tokenId"),
  isLoggedIn: localStorage.getItem("isLoggedIn"),
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthStatus,
  reducers: {
    login(state, action) {
      localStorage.setItem("tokenId", action.payload);
      localStorage.setItem("isLoggedIn", true);
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem("tokenId");
      localStorage.setItem("isLoggedIn", false);
      localStorage.clear();
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
