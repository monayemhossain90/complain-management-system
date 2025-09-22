import {createSlice} from "@reduxjs/toolkit";
const initialState = {

    complainEditModalOpen:false,

   
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
  

        
        
           //  complain modal open
        SetComplainEditModalOpen:(state,action)=>{
            state.complainEditModalOpen=action.payload
        },
      
    
    }

})


export const { 
   SetComplainEditModalOpen, } = modalSlice.actions;

const modalSliceReducer = modalSlice.reducer;
export default modalSliceReducer;