import {useDispatch, useSelector} from "react-redux";
import {Modal} from "antd";
import {useEffect} from "react";
import {Button, Spinner} from "@material-tailwind/react";
import {SetAppointmentEditModalOpen} from "../../redux/features/modal/modalSlice.js";


import {useGetDoctorsQuery} from "../../redux/features/doctor/doctorApi.js";
import { SetEditAppointment } from "../../redux/features/appointment/appointmentSlice.js";
import { useUpdateAppointmentMutation } from "../../redux/features/appointment/appointmentApi.js";



const AppointmentEditModal = () => {
    const dispatch = useDispatch();
    const {data, isLoading, isError} = useGetDoctorsQuery();
    const doctors = data?.data || [];
    const modalOpen = useSelector((state)=>state.modal.appointmentEditModalOpen);
    const {appointmentId,appointment} = useSelector(state=>state.appointment);
    const {doctorId, patientName, phone, age, address, appointmentDate} = appointment || {};
    const [updateAppointment, {isSuccess,isLoading:updateLoading}] = useUpdateAppointmentMutation();





    const handleOk = () => {
        dispatch(SetAppointmentEditModalOpen(false));
    };


    const handleCancel = () => {
        dispatch(SetAppointmentEditModalOpen(false));
    };


    useEffect(()=>{
        if(isSuccess){
            dispatch(SetAppointmentEditModalOpen(false));
            // setPatientName("");
            // setPhone("");
            // setAge("");
            // setAddress("")
        }
    },[isSuccess, dispatch])





    //update receive account
    const handleSubmit = (e) => {
        e.preventDefault();
        updateAppointment({
            id:appointmentId,
            data:{
                doctorId,
                patientName,
                age,
                phone,
                address,
                appointmentDate: new Date(appointmentDate)
            }
        })
    }


    return (
        <>
            <Modal title="Update Appointment" open={modalOpen} onOk={handleOk}>
                <form onSubmit={handleSubmit}>
                    <div className="pt-2">
                        <label className="block pb-2" htmlFor="amount">
                            Doctor
                        </label>
                        <select
                            onChange={(e) => dispatch(SetEditAppointment({
                                property: "doctorId",
                                value: e.target.value
                            }))}
                            value={doctorId}
                            className="w-full outline-none border border-gray-400 bg-white px-4 py-2 rounded-md"
                            id="category" required>
                            {
                                doctors?.length>0 && (
                                    doctors?.map((doctor,i)=> (
                                        <option key={i.toString()} value={doctor?._id}>{doctor?.name}</option>
                                    ))
                                )
                            }


                        </select>
                    </div>
                    <div className="pt-2">
                        <label className="block pb-2" htmlFor="amount">
                            Patient Name
                        </label>
                        <input onChange={(e) => dispatch(SetEditAppointment({
                            property: "patientName",
                            value: e.target.value
                        }))} value={patientName}
                               className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md" type="text"
                               id="amount" required/>
                    </div>
                    <div className="pt-2">
                        <label className="block pb-2" htmlFor="ref">
                            Phone Number
                        </label>
                        <input onChange={(e) => dispatch(SetEditAppointment({
                            property: "phone",
                            value: e.target.value
                        }))} value={phone}
                               className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md" type="text"
                               id="ref" required/>
                    </div>
                    <div className="pt-2">
                        <label className="block pb-2" htmlFor="ref">
                            Date
                        </label>
                        <input onChange={(e) => dispatch(SetEditAppointment({
                            property: "appointmentDate",
                            value: e.target.value
                        }))} value={appointmentDate}
                               className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md" type="date"
                               id="ref" required/>
                    </div>
                    <div className="pt-2">
                        <label className="block pb-2" htmlFor="age">
                            Age
                        </label>
                        <input onChange={(e) => dispatch(SetEditAppointment({
                            property: "age",
                            value: e.target.value
                        }))} value={age}
                               className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md" type="text"
                               id="age" required/>
                    </div>
                    <div className="pt-2">
                        <label className="block pb-2" htmlFor="add">
                            Address
                        </label>
                        <input onChange={(e) => dispatch(SetEditAppointment({
                            property: "address",
                            value: e.target.value
                        }))} value={address}
                               className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md" type="text"
                               id="add" required/>
                    </div>
                    <div className="flex mt-6 gap-6">
                        <button id="cancel" type="reset" onClick={handleCancel}
                                className="block cursor-pointer w-1/2 bg-red-500 hover:bg-red-700 text-center text-white font-bold py-2 px-4 rounded">
                            Cancel
                        </button>
                        <Button disabled={updateLoading}
                                className={`${updateLoading && "capitalize"} w-1/2 flex gap-3 items-center justify-center disabled:cursor-not-allowed`}
                                type="submit"
                        >
                            {
                                updateLoading ? (
                                    <>
                                        <Spinner className="h-4 w-4"/> Processing...
                                    </>
                                ) : (
                                    <>
                                        Confirm
                                    </>
                                )
                            }

                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default AppointmentEditModal;