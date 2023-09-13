import { createSlice } from "@reduxjs/toolkit";

 const searchDoctorSlice=createSlice({
    name:'search',
    initialState:{
        searchKeyWords:''
        
    },
    reducers:{
        setSerchKeyWords:(state,action)=>{
            state.searchKeyWords=action.payload
        }

    }
})

export const{setSerchKeyWords}=searchDoctorSlice.actions
export default searchDoctorSlice.reducer

