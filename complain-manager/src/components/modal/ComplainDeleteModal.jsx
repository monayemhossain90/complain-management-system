import {useDispatch, useSelector} from "react-redux";
import {Modal} from "antd";
import { SetComplainDeleteModalOpen} from "../../redux/features/modal/modalSlice.js";
import {useEffect} from "react";
import {Button, Spinner} from "@material-tailwind/react";

import { useDeleteComplainMutation } from "../../redux/features/complain/complainApi.js";


const ComplainDeleteModal = () => {
    const dispatch = useDispatch();
    const modalOpen = useSelector((state)=>state.modal.complainDeleteModalOpen);
    const {complainId} = useSelector(state=>state.complain);
    const [deleteComplain, {isSuccess,isLoading}] = useDeleteComplainMutation();


    const handleOk = () => {
        dispatch(SetComplainDeleteModalOpen(false));
    };
    const handleCancel = () => {
        dispatch(SetComplainDeleteModalOpen(false));
    };

    useEffect(()=>{
        if(isSuccess){
            dispatch(SetComplainDeleteModalOpen(false));
        }
    },[isSuccess, dispatch])


    const handleDelete = () => {
        deleteComplain(complainId);
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

export default ComplainDeleteModal;