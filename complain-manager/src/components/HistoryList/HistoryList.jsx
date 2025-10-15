
import { Table } from "antd";
import { AiFillDelete } from "react-icons/ai";
import ListLoading from "../Loader/ListLoading.jsx";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useGetHistoryQuery } from "../../redux/features/history/historyApi.js";
import { SetHistoryId } from "../../redux/features/history/historySlice.js";
import { SetHistoryDeleteModalOpen } from "../../redux/features/modal/modalSlice.js";
import moment from "moment-timezone";

const HistoryList = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetHistoryQuery();
  const history = data?.data || [];
  const [searchText, setSearchText] = useState("");

  // Format date to Bangladesh Standard Time
  const formatDateBST = (date) => {
    if (!date) return "-";
    return moment(date).tz("Asia/Dhaka").format("MMM D, YYYY, h:mm A");
  };

  const columns = [
    { title: "SNo", dataIndex: "key" },
    {
      title: "Customer Id",
      dataIndex: "customerId",
      filteredValue: [searchText],
      onFilter: (value, record) =>
        Object.values(record)
          .join(" ")
          .toLowerCase()
          .includes(value.toLowerCase()),
    },
    { title: "Customer Phonenumber", dataIndex: "phonenumber" },
    { title: "Complainer", dataIndex: "complainer" },
    { title: "Location", dataIndex: "location" },
    { title: "Complain Number", dataIndex: "complainNumber" },
    { title: "Description", dataIndex: "description" },
    { title: "Employee", dataIndex: "assignEmployee" },
    { title: "Manager", dataIndex: "manager" },
    { title: "Created At", dataIndex: "createComplainAt" },
    { title: "Completed At", dataIndex: "completedAt" },
    { title: "Done At", dataIndex: "doneAt" },
    { title: "Status", dataIndex: "status" },
    { title: "Action", dataIndex: "action" },
  ];

  const tableData = history.map((item, index) => ({
    key: index + 1,
    customerId: item.customerId,
    complainer: item.complainer,
    phonenumber: item.phonenumber,
    location: item.location,
    complainNumber: item.complainNumber,
    assignEmployee: `${item.employeeFirstName} ${item.employeeLastName}`,
    manager: `${item.managerFirstName} ${item.managerLastName}`,
    description: item.description,
    createComplainAt: formatDateBST(item.createComplainAt),
    completedAt: formatDateBST(item.completedAt),
    doneAt: formatDateBST(item.doneAt),
    status: item.status,
    action: (
      <div className="flex space-x-2">
        <button
          onClick={() => {
            dispatch(SetHistoryId(item._id));
            dispatch(SetHistoryDeleteModalOpen(true));
          }}
          className="bg-red-500 hover:bg-red-700 duration-200 px-2 py-2 text-white font-bold text-md rounded-md"
        >
          <AiFillDelete size={20} />
        </button>
      </div>
    ),
  }));

  return (
    <div>
      <h1 className="text-center text-3xl font-bold mb-3">
         History List
      </h1>

      {isLoading ? (
        <ListLoading />
      ) : (
        <div className="px-2 shadow-md rounded-md">
          <div className="lg:px-4 w-auto overflow-x-auto flex flex-col sm:flex-row justify-between gap-3 py-4">
            <input
              type="text"
              className="h-full px-3 py-2 text-base text-gray-900 outline-none border-2 border-gray-300 md:w-3/4 lg:w-1/3 rounded-md"
              placeholder="Search..."
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div className="w-auto overflow-x-auto">
            <Table
              scroll={{ x: true, y: 400 }}
              columns={columns}
              dataSource={tableData}
            />
          </div>
        </div>
      )}

     
    </div>
  );
};

export default HistoryList;
