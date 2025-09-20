import {useDispatch, useSelector} from "react-redux";
import {Modal} from "antd";
import { SetHistoryDeleteModalOpen} from "../../redux/features/modal/modalSlice.js";
import {useEffect} from "react";
import {Button, Spinner} from "@material-tailwind/react";

import { useDeleteHistoryMutation } from "../../redux/features/history/historyApi.js";


const HistoryDeleteModal = () => {

    const dispatch = useDispatch();
    const modalOpen = useSelector((state)=>state.modal.historyDeleteModalOpen);
    const {historyId} = useSelector(state=>state.history);
    const [deleteHistory, {isSuccess,isLoading}] = useDeleteHistoryMutation();


    const handleOk = () => {
        dispatch(SetHistoryDeleteModalOpen(false));
    };
    const handleCancel = () => {
        dispatch(SetHistoryDeleteModalOpen(false));
    };

    useEffect(()=>{
        if(isSuccess){
            dispatch(SetHistoryDeleteModalOpen(false));
        }
    },[isSuccess, dispatch])


    const handleDelete = () => {
        deleteHistory(historyId);
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

export default HistoryDeleteModal;