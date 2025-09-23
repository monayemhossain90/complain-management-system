import {createSlice} from "@reduxjs/toolkit";
const initialState = {



    userDeleteModalOpen:false,
    userEditModalOpen:false,
    userCreateModalOpen:false,
     
    complainDeleteModalOpen:false,
    historyDeleteModalOpen:false,
   
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        

      

        //  user modal open
        SetUserDeleteModalOpen:(state,action)=>{
            state.userDeleteModalOpen=action.payload
        },
        SetUserEditModalOpen:(state,action)=>{
            state.userEditModalOpen=action.payload
        },
        SetUserCreateModalOpen:(state,action)=>{
            state.userCreateModalOpen=action.payload
        },

           //  complain modal open
        SetComplainDeleteModalOpen:(state,action)=>{
            state.complainDeleteModalOpen=action.payload
        },
          //  history delete modal open
        SetHistoryDeleteModalOpen:(state,action)=>{
            state.historyDeleteModalOpen=action.payload
        },
    
    }

})


export const { 
    
    SetUserCreateModalOpen, SetUserEditModalOpen,SetUserDeleteModalOpen,SetComplainDeleteModalOpen,SetHistoryDeleteModalOpen } = modalSlice.actions;

const modalSliceReducer = modalSlice.reducer;
export default modalSliceReducer;