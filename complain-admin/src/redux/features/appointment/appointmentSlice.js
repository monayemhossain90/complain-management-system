import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    appointmentId:"",
    appointment:{
        doctorId:"",
        patientName:"",
        phone:"",
        age:"",
        appointmentDate:"",
        address:""
    }
}

const appointmentSlice = createSlice({
    name: "appointment",
    initialState,
    reducers: {
        SetAppointmentId:(state,action)=>{
            state.appointmentId=action.payload
        },
        SetAppointment:(state, action)=>{
            state.appointment=action.payload
        },
        SetEditAppointment:(state, action)=>{
            const {property, value} = action.payload;
            state.appointment[property]=value
        }
    }

})


export const {SetAppointmentId, SetAppointment, SetEditAppointment} = appointmentSlice.actions;

const appointmentSliceReducer = appointmentSlice.reducer;
export default appointmentSliceReducer;