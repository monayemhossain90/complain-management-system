import {Table} from "antd";
import {AiFillDelete} from "react-icons/ai";
import ListLoading from "../Loader/ListLoading.jsx";
import {useDispatch} from "react-redux";

import { useState } from "react";
import { useGetHistoryQuery } from "../../redux/features/history/historyApi.js";
import { SetHistoryId } from "../../redux/features/history/historySlice.js";
import { SetHistoryDeleteModalOpen } from "../../redux/features/modal/modalSlice.js";
import HistoryDeleteModal from "../modal/HistoryDeleteModal.jsx";



const HistoryList = () => {
    const dispatch = useDispatch();
    const {data, isLoading, isError} = useGetHistoryQuery();
    const history = data?.data || [];
    const [searchText, setSearchText] = useState("");


    const columns = [
        {
            title: "SNo",
            dataIndex: "key",
        },
        {
            title: "customer Id",
            dataIndex: "customerId",
            filteredValue: [searchText],
            onFilter: (value, record) => {
                return (
                  String(record.key).toLowerCase().includes(value.toLowerCase()) ||
                  String(record.customerId).toLowerCase().includes(value.toLowerCase()) || 
                  String(record.phonenumber).toLowerCase().includes(value.toLowerCase()) || 
                  String(record.location).toLowerCase().includes(value.toLowerCase()) ||
                  String(record.complainNumber).toLowerCase().includes(value.toLowerCase()) ||
                  String(record.description).toLowerCase().includes(value.toLowerCase()) ||
                  String(record.employeeFirstName).toLowerCase().includes(value.toLowerCase()) ||
                  
                  String(record.status).toLowerCase().includes(value.toLowerCase())
                );
            },
        },
   {
            title: "Phonenumber",
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
            title: "employee",
            dataIndex: "employeeFirstName",
        },
        {
            title: "status",
            dataIndex: "status",
        },
    

        {
            title: "Action",
            dataIndex: "action",
        },
    ];

    const tableData = [];


    if (!isLoading && !isError && history?.length > 0) {
        for (let i = 0; i < history.length; i++) {
            tableData.push({
                key: Number(i + 1),
                customerId: history[i]?.customerId,
                phonenumber: history[i]?.phonenumber,
                location: history[i]?.location,
                complainNumber: history[i]?.complainNumber,
                employee: history[i]?.employeeFirstName ,
                description: history[i]?.description,
                status: history[i]?.status,
                
                
                action: (
                    <>
                        <div className="flex space-x-2">
                          
                            <button
                                onClick={() => {
                                    dispatch(SetHistoryId(history[i]?._id))
                                    dispatch(SetHistoryDeleteModalOpen(true))
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
           History List
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

        <HistoryDeleteModal />
       
      </>
    );
};

export default HistoryList;