import React, { useEffect, useState } from "react";
import { getRent, payRent } from "../../services/payment";
import { toast } from "react-toastify";
import { startRazorpayPayment } from "../../services/razorPay";

function Payments() {
  const [rents, setRent] = useState([]);

  const token = sessionStorage.getItem("token");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const tenantId = user.id;

  const getRentDetils = async () => {
    const result = await getRent(tenantId, token);
    console.log(result);

    if (result.status === "success") {
      setRent(result.data);
    } else {
      toast.error("Unable to fetch rent details");
    }
  };

  useEffect(() => {
    getRentDetils();
  }, []);

  const payMonthlyRent = async (rent) => {
    const orderRequest = {
      rentId: rent.rentId,
      amount: rent.amount,
      paymentType: "MONTHLY_RENT",
    };

    const payment = await startRazorpayPayment(orderRequest);
    console.log("startRazorpayPayment(orderRequest);");
    console.log(payment)

    if (payment.status !== "success") {
      toast.error(payment.message || "Payment Failed");
      return;
    }

    const result = await payRent( rent.rentId,
    {
        paymentMethod: "UPI",
        paymentDetails: payment.paymentDetails
    },
    token);

    if (result.status === "success") {
      toast.success("Rent Paid Successfully");

      getRentDetils();
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Payments</h2>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Month</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {rents.length > 0 ? (
            rents.map((rent) => (
              <tr key={rent.rentId}>
                <td>{rent.rentMonth}</td>
                <td>₹{rent.amount}</td>

                <td>
                  {rent.status === "PENDING" ? (
                    <span className="badge bg-warning text-dark">Pending</span>
                  ) : (
                    <span className="badge bg-success">Paid</span>
                  )}
                </td>

                <td>
                  {rent.status === "PENDING" ? (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => payMonthlyRent(rent)}
                    >
                      Pay Rent
                    </button>
                  ) : (
                    <button className="btn btn-success btn-sm" disabled>
                      Paid
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No Rent Records Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Payments;
