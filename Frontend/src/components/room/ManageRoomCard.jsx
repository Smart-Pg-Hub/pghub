import {
  FaBed,
  FaBuilding,
  FaRupeeSign,
  FaUsers,
  FaCheckCircle,
  FaEye,
  FaUserPlus,
} from "react-icons/fa";

const ManageRoomCard = ({ room }) => {
  console.log(room);

  return (
    <div className="card shadow-sm border-0 rounded-4 h-100">
      <div className="card-header bg-white d-flex justify-content-between align-items-center">
        <h5 className="fw-bold mb-0">
          <FaBed className="me-2 text-primary" />
          Room {room.roomNumber}
        </h5>

        <span
          className={`badge ${room.active ? "bg-success" : "bg-secondary"}`}
        >
          {room.active ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="card-body">
        <div className="row g-3">
          <div className="col-6">
            <small className="text-muted">Room Type</small>
            <div className="fw-semibold">{room.roomCapacity} Sharing</div>
          </div>

          <div className="col-6">
            <small className="text-muted">Floor</small>
            <div className="fw-semibold">
              <FaBuilding className="me-1 text-primary" />
              {room.floorNumber}
            </div>
          </div>

          <div className="col-6">
            <small className="text-muted">Monthly Rent</small>
            <div className="fw-semibold text-success">
              <FaRupeeSign className="me-1" />
              {room.amount}
            </div>
          </div>

          <div className="col-6">
            <small className="text-muted">Deposit</small>
            <div className="fw-semibold">
              <FaRupeeSign className="me-1" />
              {room.securityDeposit}
            </div>
          </div>

          <div className="col-6">
            <small className="text-muted">Occupied Beds</small>
            <div className="fw-semibold">
              <FaUsers className="me-1 text-primary" />
              {room.occupiedBeds}
            </div>
          </div>

          <div className="col-6">
            <small className="text-muted">Status</small>

            <div>
              <span
                className={`badge ${
                  room.status === "AVAILABLE"
                    ? "bg-success"
                    : room.status === "FULL"
                      ? "bg-danger"
                      : "bg-warning text-dark"
                }`}
              >
                <FaCheckCircle className="me-1" />
                {room.status}
              </span>
            </div>
          </div>
        </div>

        <hr />

        <small className="text-muted d-block">Description</small>

        <p className="mb-0 text-secondary">
          {room.description || "No description available."}
        </p>
      </div>

      <div className="card-footer bg-white border-0">
        <div className="d-flex justify-content-between">
          {/* View */}
          <button className="btn btn-outline-primary btn-sm">
            <FaEye className="me-1" />
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageRoomCard;
