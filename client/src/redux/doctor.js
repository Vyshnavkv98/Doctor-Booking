import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../axios/axios';

export const loginDoctor = createAsyncThunk(
  'doctor/logindoctor',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post("doctor/login", {
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

export const doctorSlice = createSlice({
  name: "doctorDetails",
  initialState: {
    loading: false,
    doctor: null,
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
      .addCase(loginDoctor.pending, (state) => {
        state.loading = true;
        state.doctor = null;
        state.error = null;
      })
      .addCase(loginDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.doctor = action.payload;
        state.error = null;
      })
      .addCase(loginDoctor.rejected, (state, action) => {
        state.loading = false;
        state.doctor = null;
        state.error = action.error.message; // Set the error message here
      });
  },
});

export const { login, logout } = doctorSlice.actions;
export default doctorSlice.reducer;
