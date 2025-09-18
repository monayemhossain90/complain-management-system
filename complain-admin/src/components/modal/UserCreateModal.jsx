import {useDispatch, useSelector} from "react-redux";
import {Modal} from "antd";
import {useEffect, useState} from "react";
import {Button, Spinner} from "@material-tailwind/react";
import {useCreateAppointmentMutation} from "../../redux/features/usere/appointmentApi.js";
import {SetAppointmentCreateModalOpen} from "../../redux/features/modal/modalSlice.js";
import {useGetDoctorsQuery} from "../../redux/features/doctor/doctorApi.js";



const AppointmentCreateModal = () => {
    const dispatch = useDispatch();
    const modalOpen = useSelector((state)=>state.modal.appointmentCreateModalOpen);
    const [doctorId, setDoctorId] = useState("")
    const [patientName, setPatientName] = useState("")
    const [phone, setPhone] = useState("");
    const [date, setDate] = useState("");
    const [age, setAge] = useState("")
    const [address, setAddress] = useState("");
    const {data} = useGetDoctorsQuery();
    const doctors = data?.data || [];
    const [createAppointment, {isSuccess,isLoading}] = useCreateAppointmentMutation();





    const handleOk = () => {
        dispatch(SetAppointmentCreateModalOpen(false));
    };


    const handleCancel = () => {
        dispatch(SetAppointmentCreateModalOpen(false));
    };


    useEffect(()=>{
        if(isSuccess){
            dispatch(SetAppointmentCreateModalOpen(false));
            setDoctorId("");
            setPatientName("");
            setPhone("");
            setAge("");
            setAddress("")
        }
    },[isSuccess, dispatch])





    const handleSubmit = (e) => {
        e.preventDefault();
        createAppointment({
            doctorId:doctorId,
            patientName,
            phone,
            age,
            address,
            appointmentDate: new Date(date)
        })
    }


    return (
        <>
            <Modal title="Make Appointment" open={modalOpen} onOk={handleOk}>
                <form onSubmit={handleSubmit}>
                    <div className="pt-2">
                        <label className="block pb-2" htmlFor="amount">
                            Doctor
                        </label>
                        <select
                            onChange={(e) => setDoctorId(e.target.value)}
                            value={doctorId}
                            className="w-full outline-none border border-gray-400 bg-white px-4 py-2 rounded-md"
                            id="category" required>
                            <option value="">Select Doctor</option>
                            {
                                doctors?.length > 0 && (
                                    doctors?.map((doctor, i) => (
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
                        <input onChange={(e) => setPatientName(e.target.value)} value={patientName}
                               className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md" type="text"
                               id="amount" required/>
                    </div>
                    <div className="pt-2">
                        <label className="block pb-2" htmlFor="ref">
                            Phone Number
                        </label>
                        <input onChange={(e) => setPhone(e.target.value)} value={phone}
                               className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md" type="text"
                               id="ref" required/>
                    </div>
                    <div className="pt-2">
                        <label className="block pb-2" htmlFor="ref">
                            Date
                        </label>
                        <input onChange={(e) => setDate(e.target.value)} value={date}
                               className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md" type="date"
                               id="ref" required/>
                    </div>
                    <div className="pt-2">
                        <label className="block pb-2" htmlFor="ref">
                            Age
                        </label>
                        <input onChange={(e) => setAge(e.target.value)} value={age}
                               className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md" type="text"
                               id="ref" required/>
                    </div>
                    <div className="pt-2">
                        <label className="block pb-2" htmlFor="des">
                            Address
                        </label>
                        <input onChange={(e) => setAddress(e.target.value)} value={address}
                               className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md" type="text"
                               id="des" required/>
                    </div>
                    <div className="flex mt-6 gap-6">
                        <button id="cancel" type="reset" onClick={handleCancel}
                                className="block cursor-pointer w-1/2 bg-red-500 hover:bg-red-700 text-center text-white font-bold py-2 px-4 rounded">
                            Cancel
                        </button>
                        <Button disabled={isLoading}
                                className={`${isLoading && "capitalize"} w-1/2 flex gap-3 items-center justify-center disabled:cursor-not-allowed`}
                                type="submit"
                        >
                            {
                                isLoading ? (
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

export default AppointmentCreateModal;