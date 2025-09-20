import { FaFileInvoiceDollar, FaUserDoctor } from "react-icons/fa6";
import DashboardLoading from "../Loader/DashboardLoading";
import { BiSolidReport } from "react-icons/bi";
import { FaAdn } from "react-icons/fa";
import { useGetPatientsQuery } from "../../redux/features/patient/patientApi.js";
import { useGetAppointmentsQuery } from "../../redux/features/appointment/appointmentApi.js";
import { useGetReportsQuery } from "../../redux/features/report/reportApi.js";
import { useGetDoctorsQuery } from "../../redux/features/doctor/doctorApi.js";

const Dashboard = () => {
  // invoices
  const { data: pateintData, isLoading: patientLoading } =
    useGetPatientsQuery();
  const invoices = pateintData?.data || [];

  //appointments
  const { data: appointmentsData, isLoading: apponitmentLoading } =
    useGetAppointmentsQuery();
  const appointments = appointmentsData?.data || [];

  //reports
  const { data: reportsData, isLoading: reportLoading } = useGetReportsQuery();
  const reports = reportsData?.data || [];

  //doctors
  const { data: doctorsData, isLoading: doctorLoading } = useGetDoctorsQuery();
  const doctors = doctorsData?.data || [];

  if (patientLoading || apponitmentLoading || reportLoading || doctorLoading) {
    return <DashboardLoading />;
  } else {
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* invoices */}
          <div className="bg-white shadow-md p-3 rounded-md">
            <div className="flex justify-between ">
              <h1 className="text-gray-900">Invoices</h1>
              <FaFileInvoiceDollar className="text-2xl text-gray-600" />
            </div>
            <h1 className="text-4xl mt-4">{invoices?.length}</h1>
            <h1 className="text-right text-gray-600">Total</h1>
          </div>

          {/* appointments */}
          <div className="bg-white shadow-md p-3 rounded-md">
            <div className="flex justify-between ">
              <h1 className="text-gray-900">Appointments</h1>
              <FaAdn className="text-2xl text-gray-600" />
            </div>
            <h1 className="text-4xl mt-4">{appointments?.length}</h1>
            <h1 className="text-right text-gray-600">Total</h1>
          </div>

          {/* Reports */}
          <div className="bg-white shadow-md p-3 rounded-md">
            <div className="flex justify-between ">
              <h1 className="text-gray-900">Reports</h1>
              <BiSolidReport className="text-2xl text-gray-600" />
            </div>
            <h1 className="text-4xl mt-4">{reports?.length}</h1>
            <h1 className="text-right text-gray-600">Total</h1>
          </div>

          {/* Doctors */}
          <div className="bg-white shadow-md p-3 rounded-md">
            <div className="flex justify-between ">
              <h1 className="text-gray-900">Doctors</h1>
              <FaUserDoctor className="text-2xl text-gray-600" />
            </div>
            <h1 className="text-4xl mt-4">{doctors?.length}</h1>
            <h1 className="text-right text-gray-600">Total</h1>
          </div>
        </div>
      </>
    );
  }
};

export default Dashboard;
