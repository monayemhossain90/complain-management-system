import {Table} from "antd";
import {AiFillDelete} from "react-icons/ai";
import ListLoading from "../Loader/ListLoading.jsx";
import {
    SetAppointmentCreateModalOpen,
    SetUserCreateModalOpen,
    SetUserDeleteModalOpen,
    SetUserEditModalOpen,
} from "../../redux/features/modal/modalSlice.js";
import {useDispatch} from "react-redux";

import AppointmentDeleteModal from "../modal/AppointmentDeleteModal.jsx";
import {FaEdit} from "react-icons/fa";
import AppointmentEditModal from "../modal/AppointmentEditModal.jsx";
import AppointmentCreateModal from "../modal/AppointmentCreateModal.jsx";
import { useState } from "react";
import { useGetUsersQuery } from "../../redux/features/users/usersApi.js";
import { SetUserId } from "../../redux/features/users/usersSlice.js";



const UsersList = () => {
    const dispatch = useDispatch();
    const {data, isLoading, isError} = useGetUsersQuery();
    const users = data?.data || [];
    const [searchText, setSearchText] = useState("");


    const columns = [
        {
            title: "Sl.No",
            dataIndex: "key",
        },
        {
            title: "firstName",
            dataIndex: "firstName",
            filteredValue: [searchText],
            onFilter: (value, record) => {
                return (
                  String(record.key).toLowerCase().includes(value.toLowerCase()) ||
                  String(record.doctor).toLowerCase().includes(value.toLowerCase()) || 
                  String(record.specialist).toLowerCase().includes(value.toLowerCase()) || 
                  String(record.patient).toLowerCase().includes(value.toLowerCase()) ||
                  String(record.phone).toLowerCase().includes(value.toLowerCase()) ||
                  String(record.age).toLowerCase().includes(value.toLowerCase()) ||
                  String(record.address).toLowerCase().includes(value.toLowerCase())
                );
            },
        },
        {
            title: "lastName",
            dataIndex: "lastName",
        },
        {
            title: "phonenumber",
            dataIndex: "phonenumber",
        },
        {
            title: "role",
            dataIndex: "role",
        },
       
        
        {
            title: "Action",
            dataIndex: "action",
        },
    ];

    const tableData = [];


    if (!isLoading && !isError && users?.length > 0) {
        for (let i = 0; i < users.length; i++) {
            tableData.push({
                key: Number(i + 1),
                patient: users[i]?.patientName,
                age: users[i]?.age,
                phone: users[i]?.phone,
                address: users[i]?.address,
                doctor: users[i]?.doctor[0]?.name,
               
    
                action: (
                    <>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => {
                                    dispatch(SetUserId(users[i]?._id))
                                  
                                    dispatch(SetUserEditModalOpen(true))
                                }}
                                className="bg-green-500 hover:bg-green-700 duration-200 px-2 py-2 text-white font-bold text-md rounded-md">
                                <FaEdit size={20}/>
                            </button>

                            <button
                                onClick={() => {
                                    dispatch(SetUserId(users[i]?._id))
                                    dispatch(SetUserDeleteModalOpen(true))
                                }}
                                className="bg-red-500 hover:bg-red-700 duration-200 px-2 py-2 text-white font-bold text-md rounded-md">
                                <AiFillDelete size={20}/>
                            </button>
                        </div>
                    </>
                ),
            });
        }

    }


    return (
      <>
        <div>
          <h1 className="text-center text-3xl font-bold mb-3">
            Appointment List
          </h1>

          {isLoading ? (
            <>
              <ListLoading />
            </>
          ) : (
            <>
              <div className="px-2 shadow-md rounded-md">
                <div className="lg:px-4 w-auto overflow-x-auto flex flex-col sm:flex-row justify-between gap-3 py-4">
                  <input
                    type="text"
                    className="h-full px-3 py-2 text-base text-gray-900 outline-none border-2 border-gray-300 md:w-3/4 lg:w-1/3 rounded-md"
                    placeholder="Search..."
                    onChange={(e) => setSearchText(e.target.value)}
                  />

                  <button
                    onClick={() => {
                      dispatch(SetUserCreateModalOpen(true));
                    }}
                    className="bg-indigo-500 text-center hover:bg-indigo-700 px-2 py-2 text-white lg:font-bold text-md rounded-md"
                    >
                    Add New User
                  </button>
                </div>

                <div className="w-auto overflow-x-auto">
                  <Table
                    scroll={{ x: true, y: 400 }}
                    columns={columns}
                    dataSource={tableData}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <AppointmentDeleteModal />
        <AppointmentEditModal />
        <AppointmentCreateModal />
      </>
    );
};

export default UsersList;