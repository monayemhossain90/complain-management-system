import {createSlice} from "@reduxjs/toolkit";
const initialState = {

   appointmentDeleteModalOpen:false,
    appointmentEditModalOpen:false,
    appointmentCreateModalOpen:false,

    doctorCreateModalOpen:false,
    doctorEditModalOpen:false,
    doctorDeleteModalOpen:false,

    userDeleteModalOpen:false,
    userEditModalOpen:false,
    userCreateModalOpen:false,
     
    complainEditModalOpen:false,
    historyDeleteModalOpen:false,
   
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        // doctor modal open
        SetDoctorCreateModalOpen:(state,action)=>{
            state.doctorCreateModalOpen=action.payload
        },
        SetDoctorEditModalOpen:(state,action)=>{
            state.doctorEditModalOpen=action.payload
        },
        SetDoctorDeleteModalOpen:(state,action)=>{
            state.doctorDeleteModalOpen=action.payload
        },

        // appointment modal open

        SetAppointmentDeleteModalOpen:(state,action)=>{
            state.appointmentDeleteModalOpen=action.payload
        },
        SetAppointmentEditModalOpen:(state,action)=>{
            state.appointmentEditModalOpen=action.payload
        },
        SetAppointmentCreateModalOpen:(state,action)=>{
            state.appointmentCreateModalOpen=action.payload
        },

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
        SetComplainEditModalOpen:(state,action)=>{
            state.complainEditModalOpen=action.payload
        },
          //  history delete modal open
        SetHistoryDeleteModalOpen:(state,action)=>{
            state.historyDeleteModalOpen=action.payload
        },
    
    }

})


export const { 
    SetDoctorCreateModalOpen, SetDoctorEditModalOpen, SetDoctorDeleteModalOpen, SetAppointmentDeleteModalOpen, SetAppointmentEditModalOpen, SetAppointmentCreateModalOpen,
     SetComplainDeleteModalOpen,SetComplainEditModalOpen,SetHistoryDeleteModalOpen } = modalSlice.actions;

const modalSliceReducer = modalSlice.reducer;
export default modalSliceReducer;