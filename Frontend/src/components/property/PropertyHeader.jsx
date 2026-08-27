import React, { useState } from "react";
import { FaImages } from "react-icons/fa";
import PropertyPhotosModal from "./PropertyPhotosModal";

const PropertyHeader = ({ property, averageRating }) => {
  const [showPhotos, setShowPhotos] = useState(false);

  if (!property) return null;

  return (
    <div className="card mb-4 shadow-sm">
      <div className="row g-0">
        {/* Property Image */}
        <div className="col-lg-4">
          <img
            src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=900"
            alt="PG"
            className="img-fluid rounded-start"
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              minHeight: "320px",
            }}
          />
        </div>

        {/* Property Information */}
        <div className="col-lg-8">
          <div className="card-body p-4">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h2 className="fw-bold text-dark mb-0">{property.name}</h2>

                <span className="badge bg-primary fs-6 mt-2">
                  {property.pgType}
                </span>
              </div>

              {/* See Photos Button */}
              <button
                className="btn btn-outline-primary"
                onClick={() => setShowPhotos(true)}
              >
                <FaImages className="me-2" />
                See Photos
              </button>
            </div>

            <hr />

            <div className="row">
              <div className="col-md-6 mb-3">
                <h6 className="text-secondary fw-bold">📍 Address</h6>

                <p className="mb-1">
                  {property.address?.area}, {property.address?.city},{" "}
                  {property.address?.state}
                </p>

                <p>{property.address?.pincode}</p>
              </div>

              <div className="col-md-6 mb-3">
                <h6 className="text-secondary fw-bold">📞 Contact Details</h6>

                <p className="mb-1">
                  <strong>Phone :</strong> {property.contact}
                </p>

                <p className="mb-1">
                  <strong>Email : </strong> {property.email}
                </p>
              </div>

              <div>
                <p className="mb-1">
                  <strong>Emenities : </strong>
                  {property.amenity}
                </p>
              </div>
            </div>

            <hr />

            <div className="row text-center justify-content-center">
              <div className="col-md-4">
                <div className="border rounded-3 p-3">
                  <h3 className="text-primary mb-1">{property.totalRooms}</h3>
                  <small>Total Rooms</small>
                </div>
              </div>

              <div className="col-md-4">
                <div className="border rounded-3 p-3">
                  <h3 className="text-warning mb-1">⭐ {averageRating}</h3>
                  <small>Rating</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Photos Popup */}
      <PropertyPhotosModal
        propertyId={property.id}
        show={showPhotos}
        onClose={() => setShowPhotos(false)}
      />
    </div>
  );
};

export default PropertyHeader;
