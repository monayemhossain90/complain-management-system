
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import { useEffect } from "react";
import { Button, Spinner } from "@material-tailwind/react";
import { SetUserEditModalOpen } from "../../redux/features/modal/modalSlice.js";

import { useUpdateUserMutation } from "../../redux/features/users/usersApi.js";
import { SetEditUser } from "../../redux/features/users/usersSlice.js";

const UserEditModal = () => {
  const dispatch = useDispatch();

  const modalOpen = useSelector((state) => state.modal.userEditModalOpen);
  const { userId, user } = useSelector((state) => state.user);
  const { firstName, lastName, phonenumber, role, password } = user || {};
  const [updateUser, { isSuccess, isLoading: updateLoading }] =
    useUpdateUserMutation();

  const handleOk = () => {
    dispatch(SetUserEditModalOpen(false));
  };

  const handleCancel = () => {
    dispatch(SetUserEditModalOpen(false));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(SetUserEditModalOpen(false));
    }
  }, [isSuccess, dispatch]);

  //update receive account
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({
      id: userId,
      data: {
        firstName,
        lastName,
        phonenumber,
        role,
        password,
      },
    });
  };

  return (
    <>
      <Modal title="Update User" open={modalOpen} onOk={handleOk}>
        <form onSubmit={handleSubmit}>
        
          <div className="pt-2">
            <label className="block pb-2" htmlFor="amount">
              firstName
            </label>
            <input
              onChange={(e) =>
                dispatch(
                  SetEditUser({
                    property: "firstName",
                    value: e.target.value,
                  })
                )
              }
              value={firstName}
              className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md"
              type="text"
              id="amount"
              required
            />
          </div>
          <div className="pt-2">
            <label className="block pb-2" htmlFor="ref">
              lastName
            </label>
            <input
              onChange={(e) =>
                dispatch(
                  SetEditUser({
                    property: "lastName",
                    value: e.target.value,
                  })
                )
              }
              value={lastName}
              className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md"
              type="text"
              id="ref"
              required
            />
          </div>
         
          <div className="pt-2">
            <label className="block pb-2" htmlFor="age">
              phonenumber
            </label>
            <input
              onChange={(e) =>
                dispatch(
                  SetEditUser({
                    property: "phonenumber",
                    value: e.target.value,
                  })
                )
              }
              value={phonenumber}
              className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md"
              type="text"
              id="age"
              required
            />
          </div>
          <div className="pt-2">
            <label className="block pb-2" htmlFor="add">
              role
            </label>
            <input
              onChange={(e) =>
                dispatch(
                  SetEditUser({
                    property: "role",
                    value: e.target.value,
                  })
                )
              }
              value={role}
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

export default UserEditModal;

