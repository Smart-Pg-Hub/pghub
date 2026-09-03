import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  bookNewRoom,
  bookingValidation,
  getBookingSummary,
} from "../../services/booking";
import { startRazorpayPayment } from "../../services/razorPay";

const Booking = () => {
  const { state } = useLocation();
  const room = state?.room;
  const navigate = useNavigate();

  const [booking, setBooking] = useState({
    joiningDate: "",
    duration: 1,
  });

  const [paymentSummary, setPaymentSummary] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paying, setPaying] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const token = sessionStorage.getItem("token");

  const handleInput = (e) => {
    const { name, value } = e.target;

    setBooking({
      ...booking,
      [name]: value,
    });
  };

  const handleProceed = async () => {
    if (!booking.joiningDate) {
      toast.error("Please select Joining Date");
      return;
    }

    setLoading(true);

    try {
      const summary = await getBookingSummary(room.id, token);

      if (summary.status === "success") {
        setPaymentSummary(summary.data);
        setShowPaymentModal(true);
      } else {
        toast.error(summary.error || "Failed to load payment summary");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!paymentMethod) {
      toast.error("Please select payment method");
      return;
    }

    setPaying(true);

    try {
      const validation = await bookingValidation(room.id, token);

      if (validation.status !== "success") {
        const message =
          typeof validation.error === "string"
            ? validation.error
            : validation.error?.message || "Booking validation failed";

        setErrorMessage(message);
        setShowPaymentModal(false);
        setShowErrorModal(true);
        return;
      }

      const payment = await startRazorpayPayment({amount: paymentSummary.totalAmount, roomId: room.id,paymentType: "BOOKING",});
     console.log("payment:")
      console.log(payment)

      if (payment.status === "success") {
        const bookingRequest = {
          roomId: room.id,
          joiningDate: booking.joiningDate,
          duration: Number(booking.duration),
          paymentMethod: paymentMethod.toUpperCase(),
          paymentDetails: payment.paymentDetails,
        };

        const bookingResponse = await bookNewRoom(bookingRequest, token);

        // send the data for booking succes page for shwing

        if (bookingResponse.status === "success") {
          setShowPaymentModal(false);
          const successBooking = {
            id: bookingResponse.data?.id || bookingResponse.data?.bookingId,

            propertyName:
              bookingResponse.data?.propertyName ||
              paymentSummary?.propertyName ||
              room?.name,

            roomNumber:
              bookingResponse.data?.roomNumber ||
              paymentSummary?.roomNumber ||
              room?.roomNumber,

            roomType:
              bookingResponse.data?.roomType || `${room?.roomCapacity} Sharing`,

            checkIn:
              bookingResponse.data?.checkIn ||
              bookingResponse.data?.joiningDate ||
              booking.joiningDate,

            duration:
              bookingResponse.data?.duration || Number(booking.duration),

            rent:
              bookingResponse.data?.rent ||
              bookingResponse.data?.firstMonthRent ||
              paymentSummary?.firstMonthRent,

            deposit:
              bookingResponse.data?.deposit ||
              bookingResponse.data?.securityDeposit ||
              paymentSummary?.securityDeposit,

            total:
              bookingResponse.data?.total ||
              bookingResponse.data?.totalAmount ||
              paymentSummary?.totalAmount,
          };
          navigate("/bookingsuccess", {
            state: {
              booking: successBooking,
            },
          });
        } else {
          toast.error(bookingResponse.error || "Booking Failed");
        }
      } else if (payment.status === "cancelled") {
        toast.info("Payment Cancelled");
      } else {
        toast.error(payment.message || "Payment Failed");
      }
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message || err.message || "Something went wrong",
      );
    } finally {
      setPaying(false);
    }
  };

  if (!room) {
    return (
      <div className="container mt-5 text-center">
        <h4>No Room Selected</h4>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6">
          <div className="mb-4">
            <h4 className="fw-bold">Confirm & Pay</h4>

            <p className="text-muted">
              Review your booking details before proceeding
            </p>
          </div>

          {/* Room Details Card */}
          <div className="card border rounded mb-3">
            <div className="card-header bg-white py-3 border-bottom">
              <div className="border-start border-4 border-primary ps-2">
                <h6 className="mb-0 fw-semibold text-dark">Room Details</h6>
              </div>
            </div>

            <div className="card-body p-3">
              <div className="row py-2 border-bottom">
                <div className="col-5 text-muted small">Property</div>

                <div className="col-7 text-end fw-medium text-dark small">
                  {room.name}
                </div>
              </div>

              <div className="row py-2 border-bottom">
                <div className="col-5 text-muted small">Room Number</div>

                <div className="col-7 text-end fw-medium text-dark small">
                  {room.roomNumber}
                </div>
              </div>

              <div className="row py-2 border-bottom">
                <div className="col-5 text-muted small">Room Type</div>

                <div className="col-7 text-end fw-medium text-dark small">
                  {room.roomCapacity} Sharing
                </div>
              </div>

              <div className="row py-2 border-bottom">
                <div className="col-5 text-muted small">Monthly Rent</div>

                <div className="col-7 text-end fw-semibold text-primary small">
                  ₹{room.amount}
                </div>
              </div>

              <div className="row py-2">
                <div className="col-5 text-muted small">Deposit</div>

                <div className="col-7 text-end fw-medium text-dark small">
                  ₹{room.securityDeposit}
                </div>
              </div>

              <div
                className="alert alert-primary d-flex align-items-center mt-3 mb-0 py-2 px-3 rounded"
                role="alert"
              >
                <span className="small text-primary">
                  First Month Rent will be calculated from the Booking Date
                </span>
              </div>
            </div>
          </div>

          {/* Booking Details Card */}
          <div className="card border rounded mb-4">
            <div className="card-header bg-white py-3 border-bottom">
              <div className="border-start border-4 border-primary ps-2">
                <h6 className="mb-0 fw-semibold text-dark">Booking Details</h6>
              </div>
            </div>

            <div className="card-body p-3">
              <div className="mb-3">
                <label className="form-label text-muted small fw-medium">
                  Joining Date
                </label>

                <input
                  type="date"
                  className="form-control rounded small py-2"
                  name="joiningDate"
                  value={booking.joiningDate}
                  onChange={handleInput}
                />
              </div>

              <div className="mb-1">
                <label className="form-label text-muted small fw-medium">
                  Duration
                </label>

                <select
                  className="form-select rounded small py-2"
                  name="duration"
                  value={booking.duration}
                  onChange={handleInput}
                >
                  <option value={1}>1 Month</option>
                  <option value={3}>3 Months</option>
                  <option value={6}>6 Months</option>
                  <option value={12}>12 Months</option>
                </select>
              </div>
            </div>
          </div>

          <button
            className="btn btn-primary w-100 py-2 rounded fw-semibold"
            onClick={handleProceed}
            disabled={loading}
          >
            {loading ? "Loading..." : "Proceed To Pay"}
          </button>

          {/* Payment Modal */}
          <Modal
            show={showPaymentModal}
            onHide={() => setShowPaymentModal(false)}
            centered
          >
            <Modal.Header closeButton className="border-bottom p-3">
              <Modal.Title className="fs-6 fw-semibold">
                Payment Summary
              </Modal.Title>
            </Modal.Header>

            <Modal.Body className="p-4">
              {paymentSummary && (
                <>
                  <div className="bg-light rounded p-3 mb-3">
                    <div className="d-flex justify-content-between mb-2 small">
                      <span className="text-muted">Property</span>

                      <span className="fw-medium">
                        {paymentSummary.propertyName}
                      </span>
                    </div>

                    <div className="d-flex justify-content-between mb-0 small">
                      <span className="text-muted">Room Number</span>

                      <span className="fw-medium">
                        {paymentSummary.roomNumber}
                      </span>
                    </div>
                  </div>

                  <div className="border rounded p-3 mb-3">
                    <div className="d-flex justify-content-between mb-2 small">
                      <span className="text-muted">First Month Rent</span>

                      <span className="fw-medium">
                        ₹{paymentSummary.firstMonthRent}
                      </span>
                    </div>

                    <div className="d-flex justify-content-between mb-2 small">
                      <span className="text-muted">Security Deposit</span>

                      <span className="fw-medium">
                        ₹{paymentSummary.securityDeposit}
                      </span>
                    </div>

                    <hr className="my-2 text-muted" />

                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-semibold small">Total Amount</span>

                      <span className="fw-bold fs-5 text-primary">
                        ₹{paymentSummary.totalAmount}
                      </span>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div>
                    <label className="text-muted mb-2 d-block small fw-medium">
                      Select Payment Method
                    </label>

                    <div className="d-flex flex-column gap-2">
                      {[
                        {
                          value: "upi",
                          label: "UPI",
                        },
                        {
                          value: "card",
                          label: "CARD",
                        },
                        {
                          value: "netbanking",
                          label: "NETBANKING",
                        },
                      ].map((method) => {
                        const isSelected = paymentMethod === method.value;

                        return (
                          <div
                            key={method.value}
                            onClick={() => setPaymentMethod(method.value)}
                            className={`p-3 border rounded d-flex align-items-center justify-content-between ${
                              isSelected
                                ? "border-primary bg-primary-subtle text-primary"
                                : "bg-white text-dark"
                            }`}
                            role="button"
                          >
                            <span className="fw-medium small">
                              {method.label}
                            </span>

                            <input
                              type="radio"
                              name="paymentMethod"
                              checked={isSelected}
                              onChange={() => {}}
                              className="form-check-input my-0"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </Modal.Body>
            <Modal.Footer className="border-top p-3">
              <button
                className="btn btn-outline-secondary rounded px-4 py-2 small"
                onClick={() => setShowPaymentModal(false)}
                disabled={paying}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary rounded px-4 py-2 fw-semibold small"
                onClick={handlePayment}
                disabled={paying}
              >
                {paying
                  ? "Processing..."
                  : `Pay ₹${paymentSummary?.totalAmount || 0}`}
              </button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={showErrorModal}
            onHide={() => setShowErrorModal(false)}
            centered
          >
            <Modal.Header closeButton className="bg-danger text-white">
              <Modal.Title className="fs-6">Booking Failed</Modal.Title>
            </Modal.Header>

            <Modal.Body className="text-center py-4">
              <h5 className="mt-3">Unable to Continue</h5>
              <p className="text-muted mt-2">{errorMessage}</p>
            </Modal.Body>
            <Modal.Footer>
              <button
                className="btn btn-danger"
                onClick={() => setShowErrorModal(false)}
              >
                OK
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Booking;
