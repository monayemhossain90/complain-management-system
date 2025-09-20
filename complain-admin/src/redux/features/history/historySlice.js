import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    historyId:"",
    history:{
        complainId:"",
        customerId:"",
        phonenumber:"",
        location:"",
        description:"",
        employeeId:"",
        status:""
    }
}

const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        SetHistoryId:(state,action)=>{
            state.historyId=action.payload
        },
        SetHistory:(state, action)=>{
            state.history=action.payload
        },
       
    }

})


export const {SetHistoryId, SetHistory} = historySlice.actions;

const historySliceReducer = historySlice.reducer;
export default historySliceReducer;