import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    complainId:"",
    complain:{
        assignEmployee:"",
        customerId:"",
        phonenumber:"",
        location:"",
        description:"",
        status:""
    }
}

const complainSlice = createSlice({
    name: "complain",
    initialState,
    reducers: {
        SetComplainId:(state,action)=>{
            state.complainId=action.payload
        },
        SetComplain:(state, action)=>{
            state.complain=action.payload
        },
        SetEditComplain:(state, action)=>{
            const {property, value} = action.payload;
            state.complain[property]=value
        }
    }

})


export const {SetComplainId, SetComplain, SetEditComplain} = complainSlice.actions;

const complainSliceReducer = complainSlice.reducer;
export default complainSliceReducer;