import {useDispatch, useSelector} from "react-redux";
import {Modal} from "antd";
import {useEffect} from "react";
import {Button, Spinner} from "@material-tailwind/react";
import {SetInvoiceUpdateModalOpen} from "../../redux/features/modal/modalSlice.js";
import {SetEditInvoice} from "../../redux/features/invoice/invoiceSlice.js";
import {useUpdatePatientMutation} from "../../redux/features/patient/patientApi.js";



const InvoiceUpdateModal = () => {
    const dispatch = useDispatch();
    const modalOpen = useSelector((state)=>state.modal.invoiceUpdateModalOpen);
    const {invoiceId,invoice} = useSelector(state=>state.invoice);
    const {status, deliveryStatus} = invoice || {};
    const [updatePatient, {isSuccess,isLoading}] = useUpdatePatientMutation();






    const handleOk = () => {
        dispatch(SetInvoiceUpdateModalOpen(false));
    };


    const handleCancel = () => {
        dispatch(SetInvoiceUpdateModalOpen(false));
    };


    useEffect(()=>{
        if(isSuccess){
            dispatch(SetInvoiceUpdateModalOpen(false));
        }
    },[isSuccess, dispatch])





    //update receive account
    const handleSubmit = (e) => {
        e.preventDefault();
        updatePatient({
            id:invoiceId,
            data:{
                status,
                deliveryStatus
            }
        })
    }


    return (
        <>
            <Modal title="Update Invoice" open={modalOpen} onOk={handleOk}>
                <form onSubmit={handleSubmit}>
                    <div className="pt-2">
                        <label className="block pb-2" htmlFor="amount">
                            Paid Status
                        </label>
                        <select
                            onChange={(e) => dispatch(SetEditInvoice({
                                property: "status",
                                value: e.target.value
                            }))}
                            value={status}
                            className="w-full outline-none border border-gray-400 bg-white px-4 py-2 rounded-md"
                            id="category" required>

                            <option value="paid">Paid</option>
                            <option value="unpaid">Unpaid</option>
                        </select>
                    </div>
                    <div className="pt-2">
                        <label className="block pb-2" htmlFor="amount">
                            Delivery Status
                        </label>
                        <select
                            onChange={(e) => dispatch(SetEditInvoice({
                                property: "deliveryStatus",
                                value: e.target.value
                            }))}
                            value={deliveryStatus}
                            className="w-full outline-none border border-gray-400 bg-white px-4 py-2 rounded-md"
                            id="category" required>

                            <option value="pending">Pending</option>
                            <option value="delivered">Delivered</option>
                        </select>
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

export default InvoiceUpdateModal;