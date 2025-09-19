import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    userId:"",
    user:{
        firstName:"",
        lastName:"",
        phonenumber:"",
        password:"",
        role:""
        
    }
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        SetUserId:(state,action)=>{
            state.userId=action.payload
        },
        SetUser:(state, action)=>{
            state.user=action.payload
        },
        SetEditUser:(state, action)=>{
            const {property, value} = action.payload;
            state.user[property]=value
        }
    }

})


export const {SetUserId, SetUser, SetEditUser} = userSlice.actions;

const userSliceReducer = userSlice.reducer;
export default userSliceReducer;