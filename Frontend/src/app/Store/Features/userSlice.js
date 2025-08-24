import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  current_User: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    StoreUser: (state, action) => {
      state.current_User = action.payload;
    },

  },
});

export const { StoreUser, updateUser, logOutUser } = userSlice.actions
export default userSlice.reducer
