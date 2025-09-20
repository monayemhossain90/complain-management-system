import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    doctorId:"",
    doctor:{
        name:"",
        email:"",
        phone:"",
        specialization:"",
        experience:"",
    }
}

const doctorSlice = createSlice({
    name: "doctor",
    initialState,
    reducers: {
        SetDoctorId:(state,action)=>{
            state.doctorId=action.payload
        },
        SetDoctor:(state, action)=>{
            state.doctor=action.payload
        },
        SetEditDoctor:(state, action)=>{
            const {property, value} = action.payload;
            state.doctor[property]=value
        }
    }

})


export const {SetDoctorId, SetDoctor, SetEditDoctor} = doctorSlice.actions;

const doctorSliceReducer = doctorSlice.reducer;
export default doctorSliceReducer;