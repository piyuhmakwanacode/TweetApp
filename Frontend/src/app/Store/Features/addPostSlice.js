import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  Addpost:false
}

const addPostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    ToggelAddPost: (state, action) => {
      state.Addpost = action.payload
    },
 setRefreshTweets: (state, action) => {
      state.refreshTweets = action.payload;
    },
  }
})

export const { ToggelAddPost,setRefreshTweets } = addPostSlice.actions
export default addPostSlice.reducer;