import {  FaUserDoctor } from "react-icons/fa6";
import DashboardLoading from "../Loader/DashboardLoading";
import { BiSolidReport } from "react-icons/bi";
import { FaAdn } from "react-icons/fa";

import { useGetComplainsQuery, useGetCompletedComplainsQuery } from "../../redux/features/complain/complainApi.js";
import { useGetUsersQuery } from "../../redux/features/users/usersApi.js";

const Dashboard = () => {
 
// completed complains
  const { data: completedComplainsData, isLoading: completedComplainsLoading } = useGetCompletedComplainsQuery();
  const completedComplains = completedComplainsData?.data || [];

  // pending complains
  const { data: pendingComplainsData, isLoading: pendingComplainsLoading } =
    useGetComplainsQuery();
  const pendingComplains = pendingComplainsData?.data || [];

  //users
  const { data: usersData, isLoading: usersLoading } = useGetUsersQuery();
  const users = usersData?.data || [];

  if (completedComplainsLoading || pendingComplainsLoading || usersLoading) {
    return <DashboardLoading />;
  } else {
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      

          {/* pending complains*/}
          <div className="bg-white shadow-md p-3 rounded-md">
            <div className="flex justify-between ">
              <h1 className="text-gray-900">Pending Complains</h1>
              <FaAdn className="text-2xl text-gray-600" />
            </div>
            <h1 className="text-4xl mt-4">{pendingComplains?.length}</h1>
            <h1 className="text-right text-gray-600">Total</h1>
          </div>

          {/* Complelted Complains */}
          <div className="bg-white shadow-md p-3 rounded-md">
            <div className="flex justify-between ">
              <h1 className="text-gray-900">Completed Complains</h1>
              <BiSolidReport className="text-2xl text-gray-600" />
            </div>
            <h1 className="text-4xl mt-4">{completedComplains?.length}</h1>
            <h1 className="text-right text-gray-600">Total</h1>
          </div>

          {/* Users */}
          <div className="bg-white shadow-md p-3 rounded-md">
            <div className="flex justify-between ">
              <h1 className="text-gray-900">Users</h1>
              <FaUserDoctor className="text-2xl text-gray-600" />
            </div>
            <h1 className="text-4xl mt-4">{users?.length}</h1>
            <h1 className="text-right text-gray-600">Total</h1>
          </div>
        </div>
      </>
    );
  }
};

export default Dashboard;
