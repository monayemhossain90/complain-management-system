


import { Table } from "antd";
import { AiFillDelete } from "react-icons/ai";
import ListLoading from "../Loader/ListLoading.jsx";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useGetHistoryQuery } from "../../redux/features/history/historyApi.js";
import { SetHistoryId } from "../../redux/features/history/historySlice.js";
import { SetHistoryDeleteModalOpen } from "../../redux/features/modal/modalSlice.js";
import HistoryDeleteModal from "../modal/HistoryDeleteModal.jsx";
import moment from "moment-timezone";

const HistoryList = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetHistoryQuery();
  const history = data?.data || [];
  const [searchText, setSearchText] = useState("");

  // Format date to Bangladesh Standard Time
  const formatDateBST = (date) => {
    if (!date) return "-";
    return moment(date).tz("Asia/Dhaka").format("MMM D, YYYY, h:mm A");
  };

  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
      width: 40,
      fixed: "left",
    },
    {
      title: "PPoE",
      dataIndex: "customerId",
      filteredValue: [searchText],
      onFilter: (value, record) =>
        Object.values(record)
          .join(" ")
          .toLowerCase()
          .includes(value.toLowerCase()),
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    { title: "Phone", dataIndex: "phonenumber", responsive: ["sm", "md", "lg", "xl"] },
    { title: "Complainer", dataIndex: "complainer", responsive: ["sm", "md", "lg", "xl"] },
    { title: "Location", dataIndex: "location", responsive: ["md", "lg", "xl"] },
    { title: "Complain No", dataIndex: "complainNumber", responsive: ["md", "lg", "xl"] },
    { title: "Description", dataIndex: "description", ellipsis: true, responsive: ["lg", "xl"] },
    { title: "Employee", dataIndex: "assignEmployee", responsive: ["md", "lg", "xl"] },
    { title: "Manager", dataIndex: "manager", responsive: ["lg", "xl"] },
    {
      title: "Created At",
      dataIndex: "createComplainAt",
      render: (value) => formatDateBST(value),
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Completed At",
      dataIndex: "completedAt",
      render: (value) => formatDateBST(value),
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Done At",
      dataIndex: "doneAt",
      render: (value) => formatDateBST(value),
      responsive: ["md", "lg", "xl"],
    },
    { title: "Status", dataIndex: "status", responsive: ["xs", "sm", "md", "lg", "xl"] },
    {
      title: "Action",
      dataIndex: "action",
      fixed: "right",
      width: 90,
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
  ];

  const tableData = history.map((item, index) => ({
    key: index + 1,
    customerId: item.customerId,
    complainer: item.complainer,
    phonenumber: item.phonenumber,
    location: item.location,
    complainNumber: item.complainNumber,
    assignEmployee: `${item.employeeFirstName || ""} ${item.employeeLastName || ""}`,
    manager: `${item.managerFirstName || ""} ${item.managerLastName || ""}`,
    description: item.description,
    createComplainAt: item.createComplainAt,
    completedAt: item.completedAt,
    doneAt: item.doneAt,
    status: item.status,
    action: (
      <button
        onClick={() => {
          dispatch(SetHistoryId(item._id));
          dispatch(SetHistoryDeleteModalOpen(true));
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
          Admin History List
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
                scroll={{ x: 1000, y: 400 }}
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

      <HistoryDeleteModal />
    </>
  );
};

export default HistoryList;
