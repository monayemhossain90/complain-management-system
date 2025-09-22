import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading:false,
    LoginError: "",
    
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        ShowLoading : (state)=>{
            state.loading=true;
        },
        HideLoading : (state)=>{
            state.loading=false;
        },
     
        
        SetLoginError : (state, action)=>{
            state.LoginError=action.payload;
        },
       
    }
})



export const {ShowLoading, HideLoading,   SetLoginError, } = authSlice.actions;

const authSliceReducer = authSlice.reducer;
export default authSliceReducer;