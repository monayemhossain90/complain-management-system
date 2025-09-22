import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import { useEffect } from "react";
import { Button, Spinner } from "@material-tailwind/react";


import { useGetEmployeesQuery } from "../../redux/features/employees/employeesApi.js";
import { useUpdateComplainMutation } from "../../redux/features/complain/complainApi.js";
import { SetComplainEditModalOpen } from "../../redux/features/modal/modalSlice.js";
import { SetEditComplain } from "../../redux/features/complain/complainSlice.js";

const ComplainEditModal = () => {
  const dispatch = useDispatch();
  const { data } = useGetEmployeesQuery();
  const employees = data?.data || [];
  const modalOpen = useSelector((state) => state.modal.complainEditModalOpen);
  const { complainId, complain } = useSelector((state) => state.complain);
  const {
    customerId,
    phonenumber,
    location,
    complainNumber,
    description,
    assignEmployee,
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
      // setPatientName("");
      // setPhone("");
      // setAge("");
      // setAddress("")
    }
  }, [isSuccess, dispatch]);

  //update receive account
  const handleSubmit = (e) => {
    e.preventDefault();
    updateComplain({
      id: complainId,
      data: {
        customerId,
        phonenumber,
        location,
        complainNumber,
        description,
        assignEmployee,
        status,
      },
    });
  };

  return (
    <>
      <Modal title="Update Complain" open={modalOpen} onOk={handleOk}>
        <form onSubmit={handleSubmit}>
         
          <div className="pt-2">
            <label className="block pb-2" htmlFor="custormerId">
              customer Id
            </label>
            <input
              onChange={(e) =>
                dispatch(
                  SetEditComplain({
                    property: "customerId",
                    value: e.target.value,
                  })
                )
              }
              value={customerId}
              className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md"
              type="text"
              id="amount"
              required
            />
          </div>
          <div className="pt-2">
            <label className="block pb-2" htmlFor="ref">
              Phone Number
            </label>
            <input
              onChange={(e) =>
                dispatch(
                  SetEditComplain({
                    property: "phonenumber",
                    value: e.target.value,
                  })
                )
              }
              value={phonenumber}
              className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md"
              type="text"
              id="ref"
              required
            />
          </div>

          <div className="pt-2">
            <label className="block pb-2" htmlFor="location">
              location
            </label>
            <input
              onChange={(e) =>
                dispatch(
                  SetEditComplain({
                    property: "location",
                    value: e.target.value,
                  })
                )
              }
              value={location}
              className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md"
              type="text"
              id="age"
              required
            />
          </div>
          <div className="pt-2">
            <label className="block pb-2" htmlFor="add">
              complainNumber
            </label>
            <input
              onChange={(e) =>
                dispatch(
                  SetEditComplain({
                    property: "complainNumber",
                    value: e.target.value,
                  })
                )
              }
              value={complainNumber}
              className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md"
              type="text"
              id="add"
              required
            />
          </div>

          <div className="pt-2">
            <label className="block pb-2" htmlFor="description">
              description
            </label>
            <input
              onChange={(e) =>
                dispatch(
                  SetEditComplain({
                    property: "description",
                    value: e.target.value,
                  })
                )
              }
              value={description}
              className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md"
              type="text"
              id="add"
              required
            />
          </div>
          <div className="pt-2">
            <label className="block pb-2" htmlFor="assignEmployee">
              assignEmployee
            </label>
            <select
              onChange={(e) =>
                dispatch(
                  SetEditComplain({
                    property: "assignEmployee",
                    value: e.target.value,
                  })
                )
              }
              value={assignEmployee}
              className="w-full outline-none border border-gray-400 bg-white px-4 py-2 rounded-md"
              id="category"
              required
            >
              {employees?.length > 0 &&
                employees?.map((employee, i) => (
                  <option key={i.toString()} value={employee?._id}>
                    {employee?.firstName}
                  </option>
                ))}
            </select>
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
