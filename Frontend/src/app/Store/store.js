import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Store/Features/userSlice.js";
import addPostSlice from "../Store/Features/addPostSlice.js";
export default configureStore({
  reducer: {
    userSlice,
    addPostSlice,
  },
});
