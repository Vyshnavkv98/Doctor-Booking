import {createSlice} from "@reduxjs/toolkit"

export const adminSlice=createSlice({
    name:"adminDetails",
    initialState:{value:{}},
    reducers:{
        adminLogin:(state,action)=>{
            state.value=action.payload;
         }
    }
})
export const {adminLogin}=adminSlice.actions
export default adminSlice.reducer