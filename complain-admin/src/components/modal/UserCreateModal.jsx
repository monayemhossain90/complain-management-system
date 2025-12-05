import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { Button, Spinner } from "@material-tailwind/react";
import { SetUserCreateModalOpen } from "../../redux/features/modal/modalSlice.js";
import { useCreateUserMutation } from "../../redux/features/users/usersApi.js";

const UserCreateModal = () => {
  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.modal.userCreateModalOpen);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [createUser, { isSuccess, isLoading }] = useCreateUserMutation();

  const handleOk = () => {
    dispatch(SetUserCreateModalOpen(false));
  };

  const handleCancel = () => {
    dispatch(SetUserCreateModalOpen(false));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(SetUserCreateModalOpen(false));
      setFirstName("");
      setLastName("");
      setPhonenumber("");
      setRole("");
      setPassword("");
    }
  }, [isSuccess, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser({
      firstName,
      lastName,
      phonenumber,
      role,
      password,
    });
  };

  return (
    <>
      <Modal title="Create an User" open={modalOpen} onOk={handleOk}>
        <form onSubmit={handleSubmit}>
          <div className="pt-2">
            <label className="block pb-2" htmlFor="amount">
              firstName
            </label>
            <input
              onChange={(e) => setFirstName(e.target.value)}
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
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md"
              type="text"
              id="ref"
              required
            />
          </div>
          <div className="pt-2">
            <label className="block pb-2" htmlFor="ref">
              phonenumber
            </label>
            <input
              onChange={(e) => setPhonenumber(e.target.value)}
              value={phonenumber}
              className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md"
              type="text"
              id="ref"
              required
            />
          </div>
       
          <div className="pt-2">
            <label className="block pb-2" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md"
              required
            >
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
              <option value="partner">Partner</option>
            </select>
          </div>

          <div className="pt-2">
            <label className="block pb-2" htmlFor="ref">
              password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md"
              type="text"
              id="ref"
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
    </>
  );
};

export default UserCreateModal;
