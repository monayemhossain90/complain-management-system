
import { Table } from "antd";
import ListLoading from "../Loader/ListLoading.jsx";
import { useState, useMemo } from "react";
import { useGetHistoryQuery } from "../../redux/features/history/historyApi.js";
import moment from "moment-timezone";

const HistoryList = () => {
  const { data, isLoading, isError } = useGetHistoryQuery();
  const history = data?.data || [];
  const [searchText, setSearchText] = useState("");

  // Format date to Bangladesh Standard Time
  const formatDateBST = (date) => {
    if (!date) return "-";
    return moment(date).tz("Asia/Dhaka").format("MMM D, YYYY, h:mm A");
  };

  // Map and filter history for the table
  const tableData = useMemo(
    () =>
      history
        .filter((item) => {
          if (!searchText) return true;
          const text = searchText.toLowerCase();
          return (
            String(item.customerId)?.toLowerCase().includes(text) ||
            String(item.phonenumber)?.toLowerCase().includes(text) ||
            String(item.location)?.toLowerCase().includes(text) ||
            String(item.complainNumber)?.toLowerCase().includes(text) ||
            String(item.description)?.toLowerCase().includes(text) ||
            String(item.employeeFirstName + " " + item.employeeLastName)?.toLowerCase().includes(text) ||
            String(item.managerFirstName + " " + item.managerLastName)?.toLowerCase().includes(text) ||
            String(item.complainer)?.toLowerCase().includes(text) ||
            String(item.status)?.toLowerCase().includes(text)
          );
        })
        .map((item, index) => ({
          key: index + 1,
          customerId: item.customerId,
          complainer: item.complainer,
          phonenumber: item.phonenumber,
          location: item.location,
          complainNumber: item.complainNumber,
          assignEmployee: item.employeeFirstName + " " + item.employeeLastName,
          manager: item.managerFirstName + " " + item.managerLastName,
          description: item.description,
          createComplainAt: formatDateBST(item.createComplainAt),
          completedAt: item.completedAt ? formatDateBST(item.completedAt) : "-",
          status: item.status,
        })),
    [history, searchText]
  );

  const columns = [
    { title: "SNo", dataIndex: "key", width: 40, fixed: "left" },
    { title: "PPPoE", dataIndex: "customerId", responsive: ["xs", "sm", "md", "lg"] },
    { title: "Customer Phonenumber", dataIndex: "phonenumber", responsive: ["sm", "md", "lg"] },
    { title: "Location", dataIndex: "location", responsive: ["md", "lg"] },
    { title: "Complain No", dataIndex: "complainNumber", responsive: ["xs", "sm", "md", "lg"] },
    {
      title: "Description",
      dataIndex: "description",
      responsive: ["lg"],
      ellipsis: true,
    },
    { title: "Employee", dataIndex: "assignEmployee", responsive: ["sm", "md", "lg"] },
    { title: "Manager", dataIndex: "manager", responsive: ["md", "lg"] },
    { title: "Created At", dataIndex: "createComplainAt", responsive: ["sm", "md", "lg"] },
    { title: "Completed At", dataIndex: "completedAt", responsive: ["md", "lg"] },
    {
      title: "Status",
      dataIndex: "status",
      fixed: "right",
      width: 100,
      render: (text) => (
        <span
          className={`px-2 py-1 rounded text-white ${
            text === "completed"
              ? "bg-green-500"
              : text === "pending"
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
        >
          {text}
        </span>
      ),
    },
  ];

  return (
    <div className="p-2 md:p-4">
      <h1 className="text-center text-2xl md:text-3xl font-bold mb-4">Employee History List</h1>

      {isLoading ? (
        <ListLoading />
      ) : isError ? (
        <p className="text-center text-red-500">Failed to load history.</p>
      ) : (
        <div className="bg-white shadow-lg rounded-md p-2 md:p-4">
          {/* Search Input */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pb-4">
            <input
              type="text"
              className="w-full sm:w-1/2 md:w-1/3 px-3 py-2 text-base border border-gray-300 rounded-md focus:ring focus:ring-blue-300 outline-none"
              placeholder="🔍 Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          {/* Responsive Table Wrapper */}
          <div className="overflow-x-auto rounded-md border border-gray-200">
            <Table
              columns={columns}
              dataSource={tableData}
              pagination={{ pageSize: 10, responsive: true }}
              scroll={{ x: 900, y: 400 }}
              size="middle"
              bordered
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryList;
