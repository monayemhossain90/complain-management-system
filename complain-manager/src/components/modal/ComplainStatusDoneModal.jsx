

import { useDispatch, useSelector } from "react-redux";
import { Modal, message } from "antd";
import { useEffect } from "react";
import { Button, Spinner } from "@material-tailwind/react";

import { useUpdateComplainStatusDoneMutation } from "../../redux/features/complain/complainApi.js";
import { SetComplainStatusDoneModalOpen } from "../../redux/features/modal/modalSlice.js";
import { SetEditComplain } from "../../redux/features/complain/complainSlice.js";
 // 👈 you'll need this action

const ComplainStatusDoneModal = () => {
  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.modal.complainStatusDoneModalOpen);
  const { complainId, complain } = useSelector((state) => state.complain);
  const { status } = complain || {};

  const [updateComplainStatusDone, { isSuccess, isLoading }] =
    useUpdateComplainStatusDoneMutation();

  // Close modal after success
  useEffect(() => {
    if (isSuccess) {
      message.success("Complain status updated successfully!");
      dispatch(SetComplainStatusDoneModalOpen(false));
    }
  }, [isSuccess, dispatch]);

  const handleCancel = () => {
    dispatch(SetComplainStatusDoneModalOpen(false));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateComplainStatusDone({
      id: complainId,
      data: { status },
    });
  };

  return (
    <Modal
      title="Update Complain Status"
      open={modalOpen}
      onCancel={handleCancel}
      footer={null} // remove default footer
    >
      <form onSubmit={handleSubmit}>
      
      <div className="pt-2">
  <label className="block pb-2" htmlFor="status">
    Status
  </label>
  <select
    id="status"
    value={status}
    onChange={(e) =>
      dispatch(
        SetEditComplain({
          property: "status",
          value: e.target.value,
        })
      )
    }
    className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md"
    required
  >
    
    <option value="done">done</option>
    <option value="completed">completed</option>
  </select>
</div>


        <div className="flex mt-6 gap-6">
          <button
            type="reset"
            onClick={handleCancel}
            className="block cursor-pointer w-1/2 bg-red-500 hover:bg-red-700 text-center text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <Button
            disabled={isLoading}
            className={`${
              isLoading && "capitalize"
            } w-1/2 flex gap-3 items-center justify-center disabled:cursor-not-allowed`}
            type="submit"
          >
            {isLoading ? (
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
  );
};

export default ComplainStatusDoneModal;
