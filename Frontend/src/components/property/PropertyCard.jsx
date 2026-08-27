import React from "react";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow h-100">
        <img
          src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=700"
          className="card-img-top"
          alt="PG"
          height="220"
        />

        <div className="card-body">
          <h4 className="card-title">{property.name}</h4>

          <p className="text-muted mb-1">
            {" "}
            {property.address?.city}, {property.address?.state}
          </p>
          <hr />

          <p>
            <strong>PG Type :</strong> {property.pgType}
          </p>

          <p>
            <strong>Total Rooms :</strong> {property.totalRooms}
          </p>

          <p>
            <strong>Amenities :</strong> {property.amenity}
          </p>

          <p>
            <strong>Contact :</strong> {property.contact}
          </p>
        </div>

        <div className="card-footer bg-white border-0">
          <button
            className="btn btn-primary w-100"
            onClick={() => navigate(`/property/details/${property.id}`)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
