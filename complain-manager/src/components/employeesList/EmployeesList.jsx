import {Table} from "antd";
import ListLoading from "../Loader/ListLoading.jsx";
import { useState } from "react";
import { useGetEmployeesQuery } from "../../redux/features/employees/employeesApi.js";



const EmployeeList = () => {
    
    const {data, isLoading, isError} = useGetEmployeesQuery();
    const employees = data?.data || [];
    const [searchText, setSearchText] = useState("");


    const columns = [
        {
            title: "Sl.No",
            dataIndex: "key",
        },
        {
            title: "FirstName",
            dataIndex: "firstName",
            filteredValue: [searchText],
            onFilter: (value, record) => {
                return (
                  String(record.key).toLowerCase().includes(value.toLowerCase()) ||
                  String(record.firstName).toLowerCase().includes(value.toLowerCase()) || 
                  String(record.lastName).toLowerCase().includes(value.toLowerCase()) || 
                  String(record.role).toLowerCase().includes(value.toLowerCase()) ||
                  String(record.phonenumber).toLowerCase().includes(value.toLowerCase()) 
               
                );
            },
        },
        {
            title: "LastName",
            dataIndex: "lastName",
        },
        {
            title: "Phonenumber",
            dataIndex: "phonenumber",
        },
        {
            title: "Role",
            dataIndex: "role",
        },
       
        
      
    ];

    const tableData = [];


    if (!isLoading && !isError && employees?.length > 0) {
        for (let i = 0; i < employees.length; i++) {
            tableData.push({
                key: Number(i + 1),
                firstName: employees[i]?.firstName,
                lastName: employees[i]?.lastName,
                phonenumber: employees[i]?.phonenumber,
                role: employees[i]?.role,
               
            });
        }

    }


    return (
      <>
        <div>
          <h1 className="text-center text-3xl font-bold mb-3">
            Employee List
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

export default EmployeeList;