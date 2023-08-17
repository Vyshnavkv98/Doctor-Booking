import { createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name:"userDetails",
    initialState:{value:{}},
    reducers:{
        login:(state, action)=>{
            state.value= action.payload;
        
        },
        logout:(state,action)=>{
            state.value= null;
           
        }
    }
});
export const {login} = userSlice.actions;
export const {logout} = userSlice.actions;
export default userSlice.reducer;
