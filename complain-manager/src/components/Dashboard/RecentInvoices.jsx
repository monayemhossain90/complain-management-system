import { Table } from "antd";
import { SetInvoiceUpdateModalOpen } from "../../redux/features/modal/modalSlice.js";
import { useDispatch } from "react-redux";
import moment from "moment";
import { FaEdit } from "react-icons/fa";
import { useGetRecentInvoicesQuery } from "../../redux/features/patient/patientApi.js";
import InvoiceUpdateModal from "../modal/InvoiceUpdateModal.jsx";
import {
  SetInvoice,
  SetInvoiceId,
} from "../../redux/features/invoice/invoiceSlice.js";
import RecentLoading from "../Loader/RecentLoading.jsx";

const RecentInvoices = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetRecentInvoicesQuery(); //RecentInvoices or RecentPatients
  const invoices = data?.data || [];

  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "#Invoice",
      dataIndex: "invoice",
    },
    {
      title: "Patient Name",
      dataIndex: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Total Bill",
      dataIndex: "price",
    },
    {
      title: "Delivery Date",
      dataIndex: "deliveryDate",
    },

    {
      title: "Delivery Status",
      dataIndex: "deliveryStatus",
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

  if (!isLoading && !isError && invoices?.length > 0) {
    for (let i = 0; i < invoices.length; i++) {
      tableData.push({
        key: Number(i + 1),
        invoice: invoices[i]?.invoiceNumber,
        name: invoices[i]?.name,
        status: (
          <>
            <span
              className={`capitalize ${
                invoices[i]?.status === "paid"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {invoices[i]?.status}
            </span>
          </>
        ),
        Status: invoices[i]?.status,
        price: invoices[i]?.price,
        deliveryDate: moment(invoices[i]?.deliveryDate).format("ddd MMM DD"),
        deliveryStatus: (
          <>
            <span
              className={`capitalize ${
                invoices[i]?.deliveryStatus === "delivered"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {invoices[i]?.deliveryStatus}
            </span>
          </>
        ),
        DeliveryStatus: invoices[i]?.deliveryStatus,
        date: moment(invoices[i]?.createdAt).format("YYYY-MM-DD"),
        action: (
          <>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  dispatch(SetInvoiceId(invoices[i]?._id));
                  dispatch(SetInvoice(invoices[i]));
                  dispatch(SetInvoiceUpdateModalOpen(true));
                }}
                className="bg-green-500 hover:bg-green-700 duration-200 px-2 py-2 text-white font-bold text-md rounded-md"
              >
                <FaEdit size={20} />
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
              Recent Invoices
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

      <InvoiceUpdateModal />
    </>
  );
};

export default RecentInvoices;
