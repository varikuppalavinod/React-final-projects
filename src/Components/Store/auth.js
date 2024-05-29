

import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const initialauthstate = {
  token: token || "", 
  isLoggedin: token ? true : false
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialauthstate,
  reducers: {
    login(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", state.token);
      state.isLoggedin = true;
     // console.log("this is redux", state.token);
    },
    logout(state) {
      localStorage.removeItem("token");
      state.token = "";
      state.isLoggedin = false;
    }
  }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
