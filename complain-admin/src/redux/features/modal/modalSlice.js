import {createSlice} from "@reduxjs/toolkit";
const initialState = {
   
    userDeleteModalOpen:false,
    userEditModalOpen:false,
    userCreateModalOpen:false,
     
    complainDeleteModalOpen:false,
   
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        

        //  user modal
        SetUserDeleteModalOpen:(state,action)=>{
            state.userDeleteModalOpen=action.payload
        },
        SetUserEditModalOpen:(state,action)=>{
            state.userEditModalOpen=action.payload
        },
        SetUserCreateModalOpen:(state,action)=>{
            state.userCreateModalOpen=action.payload
        },

           //  complain modal 
        SetComplainDeleteModalOpen:(state,action)=>{
            state.complainDeleteModalOpen=action.payload
        },
     
    
    }

})


export const {SetUserCreateModalOpen, SetUserEditModalOpen,SetUserDeleteModalOpen,SetComplainDeleteModalOpen, } = modalSlice.actions;

const modalSliceReducer = modalSlice.reducer;
export default modalSliceReducer;