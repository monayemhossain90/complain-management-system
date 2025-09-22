import {useDispatch, useSelector} from "react-redux";
import {Modal} from "antd";
import {useEffect} from "react";
import {Button, Spinner} from "@material-tailwind/react";
import {SetDoctorEditModalOpen} from "../../redux/features/modal/modalSlice.js";
import {SetEditDoctor} from "../../redux/features/doctor/doctorSlice.js";
import {useUpdateDoctorMutation} from "../../redux/features/doctor/doctorApi.js";


const DoctorEditModal = () => {
    const dispatch = useDispatch();
    const modalOpen = useSelector((state)=>state.modal.doctorEditModalOpen);
    const {doctorId,doctor} = useSelector(state=>state.doctor);
    const [updateDoctor, {isSuccess,isLoading}] = useUpdateDoctorMutation();
    const {name, email, phone, specialization, experience} = doctor || {};


    const handleOk = () => {
        dispatch(SetDoctorEditModalOpen(false));
    };
    const handleCancel = () => {
        dispatch(SetDoctorEditModalOpen(false));
    };


    useEffect(()=>{
        if(isSuccess){
            dispatch(SetDoctorEditModalOpen(false));
        }
    },[isSuccess, dispatch])



    //update receive account
    const handleSubmit = (e) => {
        e.preventDefault();
        updateDoctor({
            id:doctorId,
            data:{
                name,
                email,
                phone,
                specialization,
                experience
            }
        })
    }

    return (
        <>
            <Modal title="Update Doctor" open={modalOpen} onOk={handleOk}>
                <form onSubmit={handleSubmit}>
                    <div className="pt-2">
                        <label className="block pb-2" htmlFor="name">
                            Full Name
                        </label>
                        <input onChange={(e) => dispatch(SetEditDoctor({property: "name", value: e.target.value}))}
                               value={name}
                               className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md" type="text"
                               id="name" required/>
                    </div>
                    <div className="pt-2">
                        <label className="block pb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input onChange={(e) => dispatch(SetEditDoctor({property: "email", value: e.target.value}))}
                               value={email}
                               className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md" type="email"
                               id="email" required/>
                    </div>
                    <div className="pt-2">
                        <label className="block pb-2" htmlFor="ref">
                            Phone Number
                        </label>
                        <input
                            onChange={(e) => dispatch(SetEditDoctor({
                                property: "phone",
                                value: e.target.value
                            }))}
                            value={phone}
                            className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md" type="text"
                            id="ref" required/>
                    </div>
                    <div className="pt-2">
                        <label className="block pb-2" htmlFor="specialization">
                            Specialization
                        </label>
                        <input
                            onChange={(e) => dispatch(SetEditDoctor({
                                property: "specialization",
                                value: e.target.value
                            }))}
                            value={specialization}
                            className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md" type="text"
                            id="specialization" required/>
                    </div>
                    <div className="pt-2">
                        <label className="block pb-2" htmlFor="experience">
                            Experience
                        </label>
                        <input
                            onChange={(e) => dispatch(SetEditDoctor({
                                property: "experience",
                                value: e.target.value
                            }))}
                            value={experience}
                            className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md" type="text"
                            id="experience" required/>
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
                                        Save Changes
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

export default DoctorEditModal;