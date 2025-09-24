import {  FaUserDoctor } from "react-icons/fa6";
import DashboardLoading from "../Loader/DashboardLoading";
import { BiSolidReport } from "react-icons/bi";
import { FaAdn } from "react-icons/fa";

import { useGetCompletedComplainsQuery, useGetPendingComplainsQuery } from "../../redux/features/complain/complainApi.js";
import { useGetEmployeesQuery } from "../../redux/features/employees/employeesApi.js";

const Dashboard = () => {
 
// completed complains
  const { data: completedComplainsData, isLoading: completedComplainsLoading } = useGetCompletedComplainsQuery();
  const completedComplains = completedComplainsData?.data || [];

  // pending complains
  const { data: pendingComplainsData, isLoading: pendingComplainsLoading } =
    useGetPendingComplainsQuery();
  const pendingComplains = pendingComplainsData?.data || [];

  //employees
  const { data: employeesData, isLoading: employeeLoading } = useGetEmployeesQuery();
  const employees = employeesData?.data || [];

  if (completedComplainsLoading || pendingComplainsLoading || employeeLoading) {
    return <DashboardLoading />;
  } else {
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      
          {/* pending complains */}
          <div className="bg-gradient-to-r from-red-500 to-green-500 shadow-lg p-4 rounded-xl text-white">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold">Pending Complains</h1>
              <FaAdn className="text-2xl" />
            </div>
            <h1 className="text-5xl mt-4 font-bold">
              {pendingComplains?.length}
            </h1>
            <h1 className="text-right opacity-80">Total</h1>
          </div>

          {/* Complelted Complains */}

          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg p-4 rounded-xl text-white">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold">Completed Complains</h1>
              <BiSolidReport className="text-2xl" />
            </div>
            <h1 className="text-5xl mt-4 font-bold">
              {completedComplains?.length}
            </h1>
            <h1 className="text-right opacity-80">Total</h1>
          </div>

          {/* Employees */}

          <div className="bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg p-4 rounded-xl text-white">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold">Employees</h1>
              <FaUserDoctor className="text-2xl" />
            </div>
            <h1 className="text-5xl mt-4 font-bold">{employees?.length}</h1>
            <h1 className="text-right opacity-80">Total</h1>
          </div>
          
        </div>
      </>
    );
  }
};

export default Dashboard;
