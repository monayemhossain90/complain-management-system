// import { Table } from "antd";
// import { AiFillDelete } from "react-icons/ai";
// import ListLoading from "../Loader/ListLoading.jsx";
// import { SetComplainDeleteModalOpen } from "../../redux/features/modal/modalSlice.js";
// import { useDispatch } from "react-redux";

// import { useState } from "react";
// import {  useGetPendingComplainsQuery } from "../../redux/features/complain/complainApi.js";
// import { SetComplainId } from "../../redux/features/complain/complainSlice.js";
// import ComplainDeleteModal from "../modal/ComplainDeleteModal.jsx";

// const PendingComplainList = () => {
//   const dispatch = useDispatch();
//   const { data, isLoading, isError } = useGetPendingComplainsQuery();
//   const complains = data?.data || [];
 

//   const [searchText, setSearchText] = useState("");

//   const columns = [
//        {
//       title: "SNo",
//       dataIndex: "key",
//     },
  
//     {
//       title: "Customer Id",
//       dataIndex: "customerId",
//       filteredValue: [searchText],
//       onFilter: (value, record) => {
//         return (
//           String(record.key).toLowerCase().includes(value.toLowerCase()) ||
         
//           String(record.customerId)
//             .toLowerCase()
//             .includes(value.toLowerCase()) ||
//           String(record.phonenumber)
//             .toLowerCase()
//             .includes(value.toLowerCase()) ||
//           String(record.location).toLowerCase().includes(value.toLowerCase()) ||
//           String(record.complainNumber)
//             .toLowerCase()
//             .includes(value.toLowerCase()) ||
//           String(record.description)
//             .toLowerCase()
//             .includes(value.toLowerCase()) ||
//           String(record.assignEmployee)
//             .toLowerCase()
//             .includes(value.toLowerCase()) ||
//             String(record.manager)
//             .toLowerCase()
//             .includes(value.toLowerCase()) ||
//             String(record.complainer)
//             .toLowerCase()
//             .includes(value.toLowerCase()) ||
//           String(record.status).toLowerCase().includes(value.toLowerCase())
//         );
//       },
//     },
//     {
//       title: "Customer Phonenumber",
//       dataIndex: "phonenumber",
//     },
//       {
//       title: "Complainer",
//       dataIndex: "complainer",
//     },
//     {
//       title: "Location",
//       dataIndex: "location",
//     },
//     {
//       title: "Complain Number",
//       dataIndex: "complainNumber",
//     },
//     {
//       title: "Description",
//       dataIndex: "description",
//     },
//       {
//         title: "Employee",
//         dataIndex: "assignEmployee",
//     },
//        {
//         title: "Manager",
//         dataIndex: "manager",
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//     },
//          {
//   title: "Created At",
//   dataIndex: "createdAt",
//   key: "createdAt",
//   render: (value) =>
//     new Date(value).toLocaleString("en-BD", {
//       dateStyle: "medium",
//       timeStyle: "short",
//     }),
// },

//     {
//       title: "Action",
//       dataIndex: "action",
//     },
//   ];

//   const tableData = [];

//   if (!isLoading && !isError && complains?.length > 0) {
//     for (let i = 0; i < complains.length; i++) {
//       tableData.push({
//       key: Number(i + 1),
//         customerId: complains[i]?.customerId,
//         phonenumber: complains[i]?.phonenumber,
//         complainer:complains[i]?.complainer,
//         location: complains[i]?.location,
//         complainNumber: complains[i]?.complainNumber,
//         assignEmployee: complains[i]?.employeeFirstName + " " + complains[i]?.employeeLastName ,
//         manager: complains[i]?.managerFirstName + " " + complains[i]?.managerLastName ,
//         description: complains[i]?.description,
//         status: complains[i]?.status,
//   createdAt: complains[i]?.createdAt, 
//         action: (
//           <>
//             <div className="flex space-x-2">
//               <button
//                 onClick={() => {
//                   dispatch(SetComplainId(complains[i]?._id));
//                   dispatch(SetComplainDeleteModalOpen(true));
//                 }}
//                 className="bg-red-500 hover:bg-red-700 duration-200 px-2 py-2 text-white font-bold text-md rounded-md"
//               >
//                 <AiFillDelete size={20} />
//               </button>
//             </div>
//           </>
//         ),
//       });
//     }
//   }

//   return (
//     <>
//       <div>
//         <h1 className="text-center text-3xl font-bold mb-3"> Pending Complain List</h1>

//         {isLoading ? (
//           <>
//             <ListLoading />
//           </>
//         ) : (
//           <>
//             <div className="px-2 shadow-md rounded-md">
//               <div className="lg:px-4 w-auto overflow-x-auto flex flex-col sm:flex-row justify-between gap-3 py-4">
//                 <input
//                   type="text"
//                   className="h-full px-3 py-2 text-base text-gray-900 outline-none border-2 border-gray-300 md:w-3/4 lg:w-1/3 rounded-md"
//                   placeholder="Search..."
//                   onChange={(e) => setSearchText(e.target.value)}
//                 />
//               </div>

//               <div className="w-auto overflow-x-auto">
//                 <Table
//                   scroll={{ x: true, y: 400 }}
//                   columns={columns}
//                   dataSource={tableData}
//                 />
//               </div>
//             </div>
//           </>
//         )}
//       </div>

//       <ComplainDeleteModal />
//     </>
//   );
// };

// export default PendingComplainList;


import { Table } from "antd";
import { AiFillDelete } from "react-icons/ai";
import ListLoading from "../Loader/ListLoading.jsx";
import { SetComplainDeleteModalOpen } from "../../redux/features/modal/modalSlice.js";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useGetPendingComplainsQuery } from "../../redux/features/complain/complainApi.js";
import { SetComplainId } from "../../redux/features/complain/complainSlice.js";
import ComplainDeleteModal from "../modal/ComplainDeleteModal.jsx";

const PendingComplainList = () => {
  const dispatch = useDispatch();
  const { data, isLoading,  } = useGetPendingComplainsQuery();
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
      title: "Description",
      dataIndex: "description",
      ellipsis: true,
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
          Pending Complains
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

export default PendingComplainList;
