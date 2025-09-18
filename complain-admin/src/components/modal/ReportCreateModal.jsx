import {useDispatch, useSelector} from "react-redux";
import {Modal} from "antd";
import {useEffect, useState} from "react";
import {Button, Spinner} from "@material-tailwind/react";
import {SetReportCreateModalOpen} from "../../redux/features/modal/modalSlice.js";
import {useCreateReportMutation} from "../../redux/features/report/reportApi.js";



const ReportCreateModal = () => {
    const dispatch = useDispatch();
    const modalOpen = useSelector((state)=>state.modal.reportCreateModalOpen);
    const [invoiceNumber, setInvoiceNumber] = useState("")
    const [result, setResult] = useState("");
    const [phone, setPhone] = useState("")
    const [createReport, {isSuccess,isLoading}] = useCreateReportMutation();




    const handleOk = () => {
        dispatch(SetReportCreateModalOpen(false));
    };


    const handleCancel = () => {
        dispatch(SetReportCreateModalOpen(false));
    };


    useEffect(()=>{
        if(isSuccess){
            dispatch(SetReportCreateModalOpen(false));
            setInvoiceNumber("");
            setResult("");
        }
    },[isSuccess, dispatch])





    const handleSubmit = (e) => {
        e.preventDefault();
        createReport({
            invoiceNumber,
            result,
            phone
        })
    }


    return (
        <>
            <Modal title="Create New Report" open={modalOpen} onOk={handleOk}>
                <form onSubmit={handleSubmit}>
                    <div className="pt-2">
                        <label className="block pb-2" htmlFor="ref">
                            Phone Number
                        </label>
                        <input onChange={(e) => setPhone(e.target.value)} value={phone}
                               className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md" type="text"
                               id="ref" required/>
                    </div>
                    <div className="pt-2">
                        <label className="block pb-2" htmlFor="invoice">
                            Invoice Number
                        </label>
                        <input onChange={(e) => setInvoiceNumber(e.target.value)} value={invoiceNumber}
                               className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md" type="number"
                               id="invoice" required/>
                    </div>
                    <div className="pt-2">
                        <label className="block pb-2" htmlFor="result">
                            Result
                        </label>
                        <input onChange={(e) => setResult(e.target.value)} value={result}
                               className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md" type="text"
                               id="result" required/>
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

export default ReportCreateModal;