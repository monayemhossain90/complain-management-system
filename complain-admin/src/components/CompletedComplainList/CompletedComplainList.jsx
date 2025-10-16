



import { Table } from "antd";
import { AiFillDelete } from "react-icons/ai";
import ListLoading from "../Loader/ListLoading.jsx";
import { SetComplainDeleteModalOpen } from "../../redux/features/modal/modalSlice.js";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useGetCompletedComplainsQuery } from "../../redux/features/complain/complainApi.js";
import { SetComplainId } from "../../redux/features/complain/complainSlice.js";
import ComplainDeleteModal from "../modal/ComplainDeleteModal.jsx";

const CompletedComplainList = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetCompletedComplainsQuery();
  const complains = data?.data || [];
  const [searchText, setSearchText] = useState("");

  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
      width: 40,
      fixed: "left",
    },
    {
      title: "PPPoE",
      dataIndex: "customerId",
      filteredValue: [searchText],
      onFilter: (value, record) =>
        Object.values(record)
          .join(" ")
          .toLowerCase()
          .includes(value.toLowerCase()),
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "Phone",
      dataIndex: "phonenumber",
      responsive: ["sm", "md", "lg", "xl"],
    },
    {
      title: "Complainer",
      dataIndex: "complainer",
      responsive: ["sm", "md", "lg", "xl"],
    },
    {
      title: "Location",
      dataIndex: "location",
      responsive: ["sm", "md", "lg", "xl"],
    },
    {
      title: "Complain No",
      dataIndex: "complainNumber",
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Employee",
      dataIndex: "assignEmployee",
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Manager",
      dataIndex: "manager",
      responsive: ["lg", "xl"],
    },
    {
      title: "Description",
      dataIndex: "description",
      responsive: ["md", "lg", "xl"],
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) =>
        new Date(value).toLocaleString("en-BD", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Completed At",
      dataIndex: "completedAt",
      key: "completedAt",
      render: (value) =>
        new Date(value).toLocaleString("en-BD", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Action",
      dataIndex: "action",
      fixed: "right",
      width: 90,
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
  ];

  const tableData = complains.map((complain, index) => ({
    key: index + 1,
    customerId: complain?.customerId,
    phonenumber: complain?.phonenumber,
    complainer: complain?.complainer,
    location: complain?.location,
    complainNumber: complain?.complainNumber,
    assignEmployee:
      complain?.employeeFirstName + " " + complain?.employeeLastName,
    manager: complain?.managerFirstName + " " + complain?.managerLastName,
    description: complain?.description,
    status: complain?.status,
    createdAt: complain?.createdAt,
    completedAt: complain?.completedAt,
    action: (
      <button
        onClick={() => {
          dispatch(SetComplainId(complain?._id));
          dispatch(SetComplainDeleteModalOpen(true));
        }}
        className="bg-red-500 hover:bg-red-700 transition px-2 py-2 text-white rounded-md flex items-center justify-center"
      >
        <AiFillDelete size={18} />
      </button>
    ),
  }));

  return (
    <>
      <div className="p-2 sm:p-4">
        <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-bold mb-4">
          Completed Complains
        </h1>

        {isLoading ? (
          <ListLoading />
        ) : (
          <div className="bg-white shadow-md rounded-lg p-2 sm:p-4">
            <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
              <input
                type="text"
                className="w-full sm:w-1/2 md:w-1/3 px-3 py-2 text-base text-gray-700 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search..."
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            <div className="overflow-x-auto">
              <Table
                scroll={{ x: 900, y: 400 }}
                columns={columns}
                dataSource={tableData}
                pagination={{ pageSize: 8 }}
                sticky
                size="small"
              />
            </div>
          </div>
        )}
      </div>

      <ComplainDeleteModal />
    </>
  );
};

export default CompletedComplainList;
