import {useDispatch, useSelector} from "react-redux";
import {Modal} from "antd";
import {SetAppointmentDeleteModalOpen} from "../../redux/features/modal/modalSlice.js";
import {useEffect} from "react";
import {Button, Spinner} from "@material-tailwind/react";
import {useDeleteAppointmentMutation} from "../../redux/features/appointment/appointmentApi.js";


const AppointmentDeleteModal = () => {
    const dispatch = useDispatch();
    const modalOpen = useSelector((state)=>state.modal.appointmentDeleteModalOpen);
    const {appointmentId} = useSelector(state=>state.appointment);
    const [deleteAppointment, {isSuccess,isLoading}] = useDeleteAppointmentMutation();


    const handleOk = () => {
        dispatch(SetAppointmentDeleteModalOpen(false));
    };
    const handleCancel = () => {
        dispatch(SetAppointmentDeleteModalOpen(false));
    };

    useEffect(()=>{
        if(isSuccess){
            dispatch(SetAppointmentDeleteModalOpen(false));
        }
    },[isSuccess, dispatch])


    const handleDelete = () => {
        deleteAppointment(appointmentId);
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

export default AppointmentDeleteModal;