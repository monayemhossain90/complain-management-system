import {useDispatch, useSelector} from "react-redux";
import {Modal} from "antd";
import {SetDoctorDeleteModalOpen} from "../../redux/features/modal/modalSlice.js";
import {useEffect} from "react";
import {useDeleteDoctorMutation} from "../../redux/features/doctor/doctorApi.js";
import {Button, Spinner} from "@material-tailwind/react";


const DoctorDeleteModal = () => {
    const dispatch = useDispatch();
    const modalOpen = useSelector((state)=>state.modal.doctorDeleteModalOpen);
    const {doctorId} = useSelector(state=>state.doctor);
    const [deleteDoctor, {isSuccess,isLoading}] = useDeleteDoctorMutation();


    const handleOk = () => {
        dispatch(SetDoctorDeleteModalOpen(false));
    };
    const handleCancel = () => {
        dispatch(SetDoctorDeleteModalOpen(false));
    };

    useEffect(()=>{
        if(isSuccess){
            dispatch(SetDoctorDeleteModalOpen(false));
        }
    },[isSuccess, dispatch])


    const handleDelete = () => {
        deleteDoctor(doctorId);
    }

    return (
        <>
            <Modal title="Are you sure? You want to delete." open={modalOpen} onOk={handleOk}>
                <div>
                    <div className="flex mt-6 gap-6 pt-5">
                        <button onClick={handleCancel} className="w-1/2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:cursor-not-allowed">
                            Cancel
                        </button>
                        <Button onClick={handleDelete} disabled={isLoading}
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
                                        Yes
                                    </>
                                )
                            }

                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default DoctorDeleteModal;