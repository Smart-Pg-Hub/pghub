import { useLocation, useNavigate } from "react-router-dom";

const BookingSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const {
    booking,
    payment,
    paymentSummary,
    room,
    bookingDetails,
    paymentMethod,
  } = state || {};
  if (!state) {
    return (
      <div className="container py-5">
        <div className="card shadow-sm mx-auto" style={{ maxWidth: "600px" }}>
          <div className="card-body text-center py-5">
            <h4>Booking Details Not Found</h4>
            <p className="text-muted">Please complete a booking first.</p>
            <button className="btn btn-primary" onClick={() => navigate("/")}>
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6">
          <div className="card shadow border-0">
            {/* Header */}
            <div className="card-body text-center py-4">
              <div className="display-3 text-success mb-3">✅</div>

              <h3 className="mb-3">Booking Confirmed</h3>

              <p className="text-muted">
                Your room has been booked successfully.
              </p>

              <hr />

              {/* Booking Details */}
              <h5 className="text-start mb-3">Booking Details</h5>

              <div className="text-start">
                <div className="d-flex justify-content-between mb-2">
                  <span>Booking ID</span>
                  <strong>{booking?.id || booking?.bookingId || "N/A"}</strong>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Property</span>
                  <strong>
                    {booking?.propertyName || room?.name || "N/A"}
                  </strong>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Room No.</span>
                  <strong>
                    {booking?.roomNumber || room?.roomNumber || "N/A"}
                  </strong>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Room Type</span>
                  <strong>
                    {booking?.roomType || `${room?.roomCapacity || ""} Sharing`}
                  </strong>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Check-In</span>
                  <strong>
                    {booking?.checkIn ||
                      booking?.joiningDate ||
                      bookingDetails?.joiningDate ||
                      "N/A"}
                  </strong>
                </div>

                <div className="d-flex justify-content-between">
                  <span>Duration</span>
                  <strong>
                    {booking?.duration || bookingDetails?.duration || 1}{" "}
                    Month(s)
                  </strong>
                </div>
              </div>

              <hr />

              {/* Payment Summary */}
              <h5 className="text-start mb-3">Payment Summary</h5>

              <div className="text-start">
                <div className="d-flex justify-content-between mb-2">
                  <span>First Month Rent</span>

                  <strong>
                    ₹{paymentSummary?.firstMonthRent ?? booking?.rent ?? 0}
                  </strong>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Security Deposit</span>

                  <strong>
                    ₹{paymentSummary?.securityDeposit ?? booking?.deposit ?? 0}
                  </strong>
                </div>

                <hr />

                <div className="d-flex justify-content-between">
                  <span className="fw-bold">Total Paid</span>

                  <span className="fw-bold text-success">
                    ₹{paymentSummary?.totalAmount ?? booking?.total ?? 0}
                  </span>
                </div>
              </div>

              <hr />

              {/* Success Message */}
              <div className="mt-4">
                <span className="badge bg-success px-3 py-2">
                  Payment Successful
                </span>
              </div>

              {/* Buttons */}
              <div className="mt-4">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => navigate("/")}
                >
                  Go To Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
