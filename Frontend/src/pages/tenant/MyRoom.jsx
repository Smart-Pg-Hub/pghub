import React, { useEffect, useState } from "react";
import { getMyRoom, checkoutRequest } from "../../services/booking";
import {
  FaDoorOpen,
  FaLayerGroup,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";
import { toast } from "react-toastify";

function MyRoom() {
  const [room, setRoom] = useState(null);

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const loadMyRoom = async () => {
      try {
        const result = await getMyRoom(token);

        console.log("My Room:", result);

        setRoom(result.data);
      } catch (error) {
        console.log(error);
        setRoom(null);
      }
    };

    loadMyRoom();
  }, [token]);

  const handleCheckoutRequest = async () => {
    try {
      const bookingId = room?.bookingId;

      if (!bookingId) {
        toast.error("Booking ID not found");
        return;
      }

      console.log("Booking ID:", bookingId);

      const result = await checkoutRequest(bookingId, token);

      if (result.status === "success") {
        toast.info("Checkout request sent");

        setRoom((prev) => ({
          ...prev,
          checkoutStatus: "REQUESTED",
        }));
      } else {
        toast.error(result.error || "Failed to submit checkout request");
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to submit checkout request",
      );
    }
  };

  if (!room) {
    return (
      <div className="container mt-4">
        <div className="card shadow border-0">
          <div className="card-body text-center py-5">
            <h4 className="text-muted">No booking available</h4>

            <p className="text-secondary mb-0">
              You currently don't have an active room booking.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <h3 className="mb-4">My Room</h3>

      <div className="card shadow border-0">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Room Details</h4>
        </div>

        <div className="card-body">
          <div className="row">
            {/* Room Number */}

            <div className="col-md-6 mb-4">
              <h6 className="text-muted">
                <FaDoorOpen className="me-2 text-primary" />
                Room Number
              </h6>

              <h5>{room.roomNumber}</h5>
            </div>

            {/* Floor */}

            <div className="col-md-6 mb-4">
              <h6 className="text-muted">
                <FaLayerGroup className="me-2 text-success" />
                Floor
              </h6>

              <h5>{room.floorNumber}</h5>
            </div>

            {/* Room Type */}

            <div className="col-md-6 mb-4">
              <h6 className="text-muted">
                <FaUsers className="me-2 text-warning" />
                Room Type
              </h6>

              <h5>{room.roomCapacity} Sharing</h5>
            </div>

            {/* Room Status */}

            <div className="col-md-6 mb-4">
              <h6 className="text-muted">
                <FaCheckCircle className="me-2 text-info" />
                Status
              </h6>

              <span className="badge bg-success fs-6 px-3 py-2">
                {room.status}
              </span>
            </div>
          </div>

          <hr />

          {/* Checkout Section */}

          <div className="text-center mt-4">
            {/* NONE */}

            {room.checkoutStatus === "NONE" && (
              <button
                className="btn btn-danger px-4"
                onClick={handleCheckoutRequest}
              >
                Request Checkout
              </button>
            )}

            {/* REQUESTED */}

            {room.checkoutStatus === "REQUESTED" && (
              <div>
                <span className="badge bg-warning text-dark fs-6 px-4 py-2">
                  Checkout Request Pending
                </span>

                <p className="text-muted mt-2 mb-0">
                  Waiting for owner approval.
                </p>
              </div>
            )}

            {/* REJECTED */}

            {room.checkoutStatus === "REJECTED" && (
              <div>
                <p className="text-danger small mb-2">
                  Your checkout request was rejected. You can request checkout
                  again.
                </p>

                <button
                  className="btn btn-danger px-4"
                  onClick={handleCheckoutRequest}
                >
                  Request Checkout
                </button>
              </div>
            )}

            {/* APPROVED */}

            {room.checkoutStatus === "APPROVED" && (
              <span className="badge bg-success fs-6 px-4 py-2">
                Checkout Approved
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyRoom;
