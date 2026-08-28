import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {
  createRent,
  getPaymentsByProperty,
  getRentDetails,
} from "../../services/payment";
import { getTenantDetailsByPgId } from "../../services/booking";

const RentManagement = () => {
  const { id } = useParams(); // PG Property ID from URL

  const [payments, setPayments] = useState([]);

  const [details, setDetails] = useState([]);

  const token = sessionStorage.getItem("token");

  const getDetails = async () => {
    const response = await getRentDetails(id, token);

    console.log(response);

    if (response.status === "success") {
      setDetails(response.data);
    }
  };
  useEffect(() => {
    getDetails();
  }, [id]);

  const paidCount = details.filter((rent) => rent.status === "PAID").length;

  const pendingCount = details.filter(
    (rent) => rent.status === "PENDING",
  ).length;

  const getBadge = (status) => {
    switch (status) {
      case "PAID":
        return <span className="badge bg-success">Paid</span>;
      case "PENDING":
        return <span className="badge bg-warning text-dark">Pending</span>;
      case "OVERDUE":
        return <span className="badge bg-danger">Overdue</span>;
      default:
        return <span className="badge bg-secondary">Unknown</span>;
    }
  };

  const createRentRequest = async (tenant) => {
    const today = new Date();

    const rentMonth = new Date(today.getFullYear(), today.getMonth(), 1)
      .toISOString()
      .split("T")[0];

    const dueDate = new Date(today.getFullYear(), today.getMonth(), 10)
      .toISOString()
      .split("T")[0];

    console.log(tenant);

    const data = {
      bookingId: tenant.bookingId,
      tenantId: tenant.tenantId,
      amount: tenant.monthlyRent,
      rentMonth: rentMonth,
      dueDate: dueDate,
    };
    console.log(tenant);

    const result = await createRent(data, token);
    console.log(result);

    if (result.status === "success") {
      toast.info("Request Send");
    } else {
      toast.error(result.error || "Payment failed");
    }
  };

  const getAction = (payment) => {
    if (payment.status === "PAID") {
      return (
        <button className="btn btn-outline-success btn-sm" disabled>
          ✓ Paid
        </button>
      );
    }

    return (
      <button
        className="btn btn-warning btn-sm"
        onClick={() => toast.info(`Reminder sent to ${payment.tenantName}`)}
      >
        Send Reminder
      </button>
    );
  };

  return (
    <div className="card shadow-sm border-0">
      {/* Summary Cards */}

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card  shadow-sm">
            <div className="card-body text-center">
              <h6 className="text-muted mb-2">Paid Tenants</h6>
              <h3 className="text-success fw-bold">{paidCount}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card  shadow-sm">
            <div className="card-body text-center">
              <h6 className="text-muted mb-2">Pending Tenants</h6>
              <h3 className="text-warning fw-bold">{pendingCount}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="card-header bg-white">
        <h4 className="fw-bold mb-0">Rent Management</h4>
      </div>

      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle">
            <thead className="table-info">
              <tr className="text-center">
                <th>Tenant</th>
                <th>Room No.</th>
                <th>Monthly Rent</th>
                <th>Billing Month</th>
                <th>Due Date</th>
                <th>Rent Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {details.length > 0 ? (
                details.map((tenant) => (
                  <tr key={tenant.rentId}>
                    <td className="fw-semibold">{tenant.tenantName}</td>

                    <td className="text-center">{tenant.roomNumber}</td>

                    <td className="text-center">₹{tenant.amount}</td>

                    <td className="text-center">{tenant.paymentDate}</td>

                    <td className="text-center">{tenant.dueDate}</td>

                    <td className="text-center">
                      <span
                        className={`badge ${
                          tenant.status === "PAID"
                            ? "bg-success"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {tenant.status}
                      </span>
                    </td>

                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-2">
                        {
                          <button
                            className="btn btn-sm btn-warning"
                            onClick={() => createRentRequest(tenant)}
                          >
                            Request To Rent
                          </button>
                        }
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-4">
                    No Rent Records Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RentManagement;
