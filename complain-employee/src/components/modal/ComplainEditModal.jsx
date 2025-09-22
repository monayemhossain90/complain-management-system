import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import { useEffect } from "react";
import { Button, Spinner } from "@material-tailwind/react";
import { useUpdateComplainMutation } from "../../redux/features/complain/complainApi.js";
import { SetComplainEditModalOpen } from "../../redux/features/modal/modalSlice.js";
import { SetEditComplain } from "../../redux/features/complain/complainSlice.js";

const ComplainEditModal = () => {
  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.modal.complainEditModalOpen);
  const { complainId, complain } = useSelector((state) => state.complain);
  const {

    status,
  } = complain || {};
  const [updateComplain, { isSuccess, isLoading: updateLoading }] =
    useUpdateComplainMutation();

  const handleOk = () => {
    dispatch(SetComplainEditModalOpen(false));
  };

  const handleCancel = () => {
    dispatch(SetComplainEditModalOpen(false));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(SetComplainEditModalOpen(false));
    
    }
  }, [isSuccess, dispatch]);

  //update receive account
  const handleSubmit = (e) => {
    e.preventDefault();
    updateComplain({
      id: complainId,
      data: {
   
        status,
      },
    });
  };

  return (
    <>
      <Modal title="Update Complain Status" open={modalOpen} onOk={handleOk}>
        <form onSubmit={handleSubmit}>
         
         
         

        
          

          <div className="pt-2">
            <label className="block pb-2" htmlFor="status">
              status
            </label>
            <input
              onChange={(e) =>
                dispatch(
                  SetEditComplain({
                    property: "status",
                    value: e.target.value,
                  })
                )
              }
              value={status}
              className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md"
              type="text"
              id="add"
              required
            />
          </div>
         

          <div className="flex mt-6 gap-6">
            <button
              id="cancel"
              type="reset"
              onClick={handleCancel}
              className="block cursor-pointer w-1/2 bg-red-500 hover:bg-red-700 text-center text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <Button
              disabled={updateLoading}
              className={`${
                updateLoading && "capitalize"
              } w-1/2 flex gap-3 items-center justify-center disabled:cursor-not-allowed`}
              type="submit"
            >
              {updateLoading ? (
                <>
                  <Spinner className="h-4 w-4" /> Processing...
                </>
              ) : (
                <>Confirm</>
              )}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ComplainEditModal;
