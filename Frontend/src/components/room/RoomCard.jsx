import React from "react";

const RoomCard = ({ room, onViewDetails, onBookNow }) => {
  const capacity = room.roomCapacity || 0;
  const availableBeds = capacity - (room.occupiedBeds || 0);
  return (
    <div className="card shadow-sm border-0 h-100">
      <div className="card-header bg-white d-flex justify-content-between align-items-center">
        <h5 className="fw-bold mb-0">Room {room.roomNumber}</h5>

        <span
          className={`badge ${availableBeds > 0 ? "bg-success" : "bg-danger"}`}
        >
          {availableBeds > 0 ? "AVAILABLE" : "FULL"}
        </span>
      </div>

      <div className="card-body">
        <div className="row">
          <div className="col-6 mb-3">
            <small className="text-muted">Total Beds</small>
            <h6>{capacity}</h6>
          </div>

          <div className="col-6 mb-3">
            <small className="text-muted">Occupied Beds</small>
            <h6>{room.occupiedBeds || 0}</h6>
          </div>

          <div className="col-6 mb-3">
            <small className="text-muted">Available Beds</small>
            <h6 className="text-success">{availableBeds}</h6>
          </div>

          <div className="col-6 mb-3">
            <small className="text-muted">Floor</small>
            <h6>{room.floorNumber}</h6>
          </div>

          <div className="col-6 mb-3">
            <small className="text-muted">Rent</small>
            <h6>₹ {room.amount}</h6>
          </div>

          <div className="col-6 mb-3">
            <small className="text-muted">Deposit</small>
            <h6>₹ {room.securityDeposit}</h6>
          </div>

          <div className="col-12">
            <small className="text-muted">Description</small>
            <p className="small">
              {room.description || "No description available"}
            </p>
          </div>
        </div>
      </div>

      <div className="card-footer bg-white border-0">
        <button
          className="btn btn-success w-100"
          disabled={availableBeds <= 0}
          onClick={() => onBookNow(room)}
        >
          {availableBeds > 0
            ? `Book Now (${availableBeds} Bed Available)`
            : "No Bed Available"}
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
