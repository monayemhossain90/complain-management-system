


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
    { title: "SNo", dataIndex: "key" },
    { title: "PPPoE", dataIndex: "customerId" },
    { title: "Customer Phonenumber", dataIndex: "phonenumber" },
    { title: "Location", dataIndex: "location" },
    { title: "Complain Number", dataIndex: "complainNumber" },
    { title: "Description", dataIndex: "description" },
    { title: "Employee", dataIndex: "assignEmployee" },
    { title: "Manager", dataIndex: "manager" },
    { title: "Created At", dataIndex: "createComplainAt" },
    { title: "Completed At", dataIndex: "completedAt" },
    { title: "Status", dataIndex: "status" },
  ];

  return (
    <div>
      <h1 className="text-center text-3xl font-bold mb-3">Employee History List</h1>

      {isLoading ? (
        <ListLoading />
      ) : isError ? (
        <p className="text-center text-red-500">Failed to load history.</p>
      ) : (
        <div className="px-2 shadow-md rounded-md">
          <div className="lg:px-4 w-auto overflow-x-auto flex flex-col sm:flex-row justify-between gap-3 py-4">
            <input
              type="text"
              className="h-full px-3 py-2 text-base text-gray-900 outline-none border-2 border-gray-300 md:w-3/4 lg:w-1/3 rounded-md"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div className="w-auto overflow-x-auto">
            <Table scroll={{ x: true, y: 400 }} columns={columns} dataSource={tableData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryList;
