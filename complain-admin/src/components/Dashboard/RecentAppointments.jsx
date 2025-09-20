import { Table } from "antd";
import { AiFillDelete } from "react-icons/ai";
import {
  SetAppointmentDeleteModalOpen,
  SetAppointmentEditModalOpen,
} from "../../redux/features/modal/modalSlice.js";
import { useDispatch } from "react-redux";
import { useGetRecentAppointmentsQuery } from "../../redux/features/appointment/appointmentApi.js";
import moment from "moment";
import {
  SetAppointment,
  SetAppointmentId,
} from "../../redux/features/appointment/appointmentSlice.js";
import AppointmentDeleteModal from "../modal/AppointmentDeleteModal.jsx";
import { FaEdit } from "react-icons/fa";
import AppointmentEditModal from "../modal/AppointmentEditModal.jsx";
import RecentLoading from "../Loader/RecentLoading.jsx";

const RecentAppointments = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetRecentAppointmentsQuery();
  const appointments = data?.data || [];

  const columns = [
    {
      title: "Sl",
      dataIndex: "key",
    },
    {
      title: "Doctor",
      dataIndex: "doctor",
    },
    {
      title: "Specialist",
      dataIndex: "specialist",
    },
    {
      title: "Patient",
      dataIndex: "patient",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
    },

    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  const tableData = [];

  if (!isLoading && !isError && appointments?.length > 0) {
    for (let i = 0; i < appointments.length; i++) {
      tableData.push({
        key: Number(i+1),
        patient: appointments[i]?.patientName,
        age: appointments[i]?.age,
        phone: appointments[i]?.phone,
        address: appointments[i]?.address,
        doctor: appointments[i]?.doctor[0]?.name,
        specialist: appointments[i]?.doctor[0]?.specialization,
        date: moment(appointments[i]?.appointmentDate).format("ddd MMM DD"),
        action: (
          <>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  dispatch(SetAppointmentId(appointments[i]?._id));
                  dispatch(
                    SetAppointment({
                      ...appointments[i],
                      appointmentDate: moment(
                        appointments[i]?.appointmentDate
                      ).format("YYYY-MM-DD"),
                    })
                  );
                  dispatch(SetAppointmentEditModalOpen(true));
                }}
                className="bg-green-500 hover:bg-green-700 duration-200 px-2 py-2 text-white font-bold text-md rounded-md"
              >
                <FaEdit size={20} />
              </button>

              <button
                onClick={() => {
                  dispatch(SetAppointmentId(appointments[i]?._id));
                  dispatch(SetAppointmentDeleteModalOpen(true));
                }}
                className="bg-red-500 hover:bg-red-700 duration-200 px-2 py-2 text-white font-bold text-md rounded-md"
              >
                <AiFillDelete size={20} />
              </button>
            </div>
          </>
        ),
      });
    }
  }

  return (
    <>
 

        {isLoading ? (
          <>
            <RecentLoading />
          </>
        ) : (
          <>
            <div className="px-2 shadow-md rounded-md bg-white mt-3">
            <h1 className="text-xl py-2 text-gray-800 font-semibold">
              Recent Appointments
            </h1>
              <div className="w-auto overflow-x-auto">
                <Table
                  scroll={{ x: true, y: 200 }}
                  columns={columns}
                  dataSource={tableData}
                />
              </div>
            </div>
          </>
        )}


      <AppointmentDeleteModal />
      <AppointmentEditModal />
    </>
  );
};

export default RecentAppointments;
