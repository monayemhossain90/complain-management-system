import {useDispatch, useSelector} from "react-redux";
import {Modal} from "antd";
import {useEffect, useState} from "react";
import {Button, Spinner} from "@material-tailwind/react";
import {SetDoctorCreateModalOpen} from "../../redux/features/modal/modalSlice.js";
import {useCreateDoctorMutation} from "../../redux/features/doctor/doctorApi.js";



const DoctorCreateModal = () => {
    const dispatch = useDispatch();
    const modalOpen = useSelector((state)=>state.modal.doctorCreateModalOpen);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [specialization, setSpecialization] = useState("");
    const [experience, setExperience] = useState("")
    const [createDoctor, {isSuccess,isLoading}] = useCreateDoctorMutation();




    const handleOk = () => {
        dispatch(SetDoctorCreateModalOpen(false));
    };


    const handleCancel = () => {
        dispatch(SetDoctorCreateModalOpen(false));
    };


    useEffect(()=>{
        if(isSuccess){
            dispatch(SetDoctorCreateModalOpen(false));
            setName("");
            setEmail("");
            setPhone("");
            setSpecialization("")
            setExperience("");
        }
    },[isSuccess, dispatch])





    const handleSubmit = (e) => {
        e.preventDefault();
        createDoctor({
            name,
            email,
            phone,
            specialization,
            experience
        })
    }


    return (
        <>
            <Modal title="Add New Doctor" open={modalOpen} onOk={handleOk}>
                <form onSubmit={handleSubmit}>
                    <div className="pt-2">
                        <label className="block pb-2" htmlFor="amount">
                            Full Name
                        </label>
                        <input onChange={(e) => setName(e.target.value)} value={name}
                               className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md" type="text"
                               id="amount" required/>
                    </div>
                    <div className="pt-2">
                        <label className="block pb-2" htmlFor="ref">
                            Email Address
                        </label>
                        <input onChange={(e) => setEmail(e.target.value)} value={email}
                               className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md" type="email"
                               id="ref" required/>
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
                        <label className="block pb-2" htmlFor="des">
                            Specialization
                        </label>
                        <input onChange={(e) => setSpecialization(e.target.value)} value={specialization}
                               className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md" type="text"
                               id="des" required/>
                    </div>
                    <div className="pt-2">
                        <label className="block pb-2" htmlFor="ref">
                            Experience
                        </label>
                        <input onChange={(e) => setExperience(e.target.value)} value={experience}
                               className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md" type="text"
                               id="ref" required/>
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
                                        Save
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

export default DoctorCreateModal;