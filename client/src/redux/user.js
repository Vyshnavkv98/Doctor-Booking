import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../axios/axios';

export const loginUser = createAsyncThunk(
  'user/loginuser',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post("login", {
        email: formData.email,
        password: formData.password,
      });

      return response.data;
    } catch (error) {
      // Handle errors if needed
      throw error;
    }
  }
);

export const userSlice = createSlice({
  name: "userDetails",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
     // reducers:{
    //     login:(state, action)=>{
    //         state.value= action.payload;
        
    //     },
    //     logout:(state,action)=>{
    //         state.value= null;
           
    //     }
    // },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message; // Set the error message here
      });
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
