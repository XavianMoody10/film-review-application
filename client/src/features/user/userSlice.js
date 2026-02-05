import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      _id: "",
      email: "",
      username: "",
    },
  },
  reducers: {
    loginUser: (state, action) => {
      state.value = action.payload;
    },
    logoutUser: (state) => {
      state.value = {
        _id: "",
        email: "",
        username: "",
      };
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
