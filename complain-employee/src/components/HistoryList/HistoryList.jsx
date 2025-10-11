import {Table} from "antd";
import ListLoading from "../Loader/ListLoading.jsx";


import { useState } from "react";
import { useGetHistoryQuery } from "../../redux/features/history/historyApi.js";





const HistoryList = () => {
   
    const {data, isLoading, isError} = useGetHistoryQuery();
    const history = data?.data || [];
    console.log(history, "history list")
    const [searchText, setSearchText] = useState("");


    const columns = [
        {
      title: "SNo",
      dataIndex: "key",
    },
  
    {
      title: "Customer Id",
      dataIndex: "customerId",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.key).toLowerCase().includes(value.toLowerCase()) ||
         
          String(record.customerId)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.phonenumber)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.location).toLowerCase().includes(value.toLowerCase()) ||
          String(record.complainNumber)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.description)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.assignEmployee)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
            String(record.manager)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
            String(record.complainer)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.status).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: "Customer Phonenumber",
      dataIndex: "phonenumber",
    },
   
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      title: "Complain Number",
      dataIndex: "complainNumber",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
  
       {
        title: "Manager",
        dataIndex: "manager",
    },

         {
        title: "Employee",
        dataIndex: "assignEmployee",
    },

    {
      title: "Status",
      dataIndex: "status",
    },

 
    ];

    const tableData = [];


    if (!isLoading && !isError && history?.length > 0) {
        for (let i = 0; i < history.length; i++) {
            tableData.push({
                key: Number(i + 1),
                customerId: history[i]?.customerId,
                complainer:history[i]?.complainer,
                phonenumber: history[i]?.phonenumber,
                location: history[i]?.location,
                complainNumber: history[i]?.complainNumber,
                assignEmployee: history[i]?.employeeFirstName + " "+ history[i]?.employeeLastName ,
                manager: history[i]?.managerFirstName + " " + history[i]?.managerLastName ,
                description: history[i]?.description,
                status: history[i]?.status,
                
                
            });
        }

    }


    return (
      <>
        <div>
          <h1 className="text-center text-3xl font-bold mb-3">
            Employee History List
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

        
       
      </>
    );
};

export default HistoryList;