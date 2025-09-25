import {useDispatch, useSelector} from "react-redux";
import {Modal} from "antd";
import {useEffect, useState} from "react";
import {Button, Spinner} from "@material-tailwind/react";
import {SetComplainCreateModalOpen} from "../../redux/features/modal/modalSlice.js";

import { useGetEmployeesQuery } from "../../redux/features/employees/employeesApi.js";
import { useCreateComplainMutation } from "../../redux/features/complain/complainApi.js";



const ComplainCreateModal = () => {
    const dispatch = useDispatch();
    const modalOpen = useSelector((state)=>state.modal.complainCreateModalOpen);
    const [assignEmployee, setAssignEmployee] = useState("")
    const [customerId, setCustomerId] = useState("")
    const [phonenumber, setPhonenumber] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const {data} = useGetEmployeesQuery();
    const employees = data?.data || [];
    const [createComplain, {isSuccess,isLoading}] = useCreateComplainMutation();





    const handleOk = () => {
        dispatch(SetComplainCreateModalOpen(false));
    };


    const handleCancel = () => {
        dispatch(SetComplainCreateModalOpen(false));
    };


    useEffect(()=>{
        if(isSuccess){
            dispatch(SetComplainCreateModalOpen(false));
            setAssignEmployee("");
            setCustomerId("");
            setPhonenumber("");
            setLocation("");
            setDescription("");
        }
    },[isSuccess, dispatch])





    const handleSubmit = (e) => {
        e.preventDefault();
        createComplain({
            assignEmployee:assignEmployee,
            customerId,
            phonenumber,
            location,
            description,
            
        })
    }


    return (
        <>
            <Modal title="Create Complain" open={modalOpen} onOk={handleOk}>
                <form onSubmit={handleSubmit}>
                    <div className="pt-2">
                        <label className="block pb-2" htmlFor="assignEmployee">
                        AssignEmployee
                        </label>
                        <select
                            onChange={(e) => setAssignEmployee(e.target.value)}
                            value={assignEmployee}
                            className="w-full outline-none border border-gray-400 bg-white px-4 py-2 rounded-md"
                            id="category" required>
                            <option value="">Select Employee</option>
                            {
                                employees?.length > 0 && (
                                    employees?.map((employee, i) => (
                                        <option key={i.toString()} value={employee?._id}>{employee?.firstName + " "+employee?.lasttName }</option>
                                    ))
                                )
                            }


                        </select>
                    </div>
                    <div className="pt-2">
                        <label className="block pb-2" htmlFor="customerId">
                            customer Id
                        </label>
                        <input onChange={(e) => setCustomerId(e.target.value)} value={customerId}
                               className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md" type="text"
                               id="amount" required/>
                    </div>
                    <div className="pt-2">
                        <label className="block pb-2" htmlFor="ref">
                            Phone Number
                        </label>
                        <input onChange={(e) => setPhonenumber(e.target.value)} value={phonenumber}
                               className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md" type="text"
                               id="ref" required/>
                    </div>
                   
                    <div className="pt-2">
                        <label className="block pb-2" htmlFor="ref">
                            Location
                        </label>
                        <input onChange={(e) => setLocation(e.target.value)} value={location}
                               className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md" type="text"
                               id="ref" required/>
                    </div>
                    <div className="pt-2">
                        <label className="block pb-2" htmlFor="description">
                            description
                        </label>
                        <input onChange={(e) => setDescription(e.target.value)} value={description}
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

export default ComplainCreateModal;