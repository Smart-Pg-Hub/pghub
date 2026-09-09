import React from "react";
import { useParams, Link } from "react-router-dom";

const PgDetails = () => {
  const { id } = useParams();

  const pgDetails = {
    name: "Elite Comfort PG",
    description:
      "Premium accommodation featuring state-of-the-art facilities, home-style meals, and strict safety guidelines.",
    amenities: ["WiFi", "AC", "Parking", "CCTV", "Power Backup"],
    rooms: [
      {
        room_id: 101,
        room_type: "single",
        capacity: 1,
        price: 12000,
        is_available: true,
      },
      {
        room_id: 102,
        room_type: "double",
        capacity: 2,
        price: 8500,
        is_available: true,
      },
      {
        room_id: 103,
        room_type: "triple",
        capacity: 3,
        price: 6500,
        is_available: false,
      },
    ],
    reviews: [
      {
        review_id: 1,
        user: "Amit S.",
        rating: 5,
        comment: "Excellent food Quality and fast internet!",
      },
      {
        review_id: 2,
        user: "Rahul K.",
        rating: 4,
        comment: "Very clean environment, friendly manager.",
      },
    ],
  };

  return (
    <div className="container py-4">
      <div className="row g-4 lg-g-5">
        {/* Gallery & Description Column */}
        <div className="col-lg-8">
          {/* Main Title Banner Header */}
          <div className="mb-4">
            <h2
              className="fw-extrabold text-dark tracking-tight mb-1"
              style={{ letterSpacing: "-0.5px" }}
            >
              {pgDetails.name}
            </h2>
            <p className="text-secondary small mb-0">
              📍 Premium Verified Managed Accommodation Listing
            </p>
          </div>

          {/* Smooth High-Quality Modern Showcase Thumbnail Banner */}
          <div
            className="overflow-hidden bg-light border border-light-subtle rounded-4 mb-5 shadow-sm"
            style={{ maxHeight: "420px" }}
          >
            <img
              src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80"
              className="w-100 h-100 object-fit-cover"
              alt={pgDetails.name}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/800x450";
              }}
            />
          </div>

          {/* Detailed Narrative Section */}
          <div className="mb-5">
            <h6
              className="fw-bold text-dark text-uppercase tracking-wider mb-3"
              style={{ fontSize: "0.75rem" }}
            >
              About this space
            </h6>
            <p
              className="text-secondary small lh-base mb-0"
              style={{ fontSize: "0.9rem" }}
            >
              {pgDetails.description}
            </p>
          </div>

          {/* Minimal Amenity Pill Clouds Mapping Layout */}
          <div className="mb-5">
            <h6
              className="fw-bold text-dark text-uppercase tracking-wider mb-3"
              style={{ fontSize: "0.75rem" }}
            >
              Amenities Provided
            </h6>
            <div className="d-flex flex-wrap gap-2">
              {pgDetails.amenities.map((amenity, idx) => (
                <span
                  key={idx}
                  className="bg-white text-dark border border-light-subtle py-1.5 px-3 fs-7 rounded-pill small fw-medium text-secondary"
                >
                  ⚡ {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* Low-Profile Customer Feedback Reviews Mapping Layout */}
          <div className="mb-4">
            <h6
              className="fw-bold text-dark text-uppercase tracking-wider mb-3"
              style={{ fontSize: "0.75rem" }}
            >
              Resident Experiences
            </h6>
            <div className="d-flex flex-column gap-3">
              {pgDetails.reviews.map((rev) => (
                <div
                  key={rev.review_id}
                  className="bg-white border border-light-subtle rounded-3 p-3 shadow-none"
                >
                  <div className="d-flex w-100 justify-content-between align-items-center mb-2">
                    <span className="fw-bold text-dark small">{rev.user}</span>
                    <span
                      className="text-warning small"
                      style={{ fontSize: "0.75rem" }}
                    >
                      {"★".repeat(rev.rating)}
                    </span>
                  </div>
                  <p className="mb-0 text-secondary small italic">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Room Configuration Selection Sidebar Column */}
        <div className="col-lg-4">
          <div className="position-sticky" style={{ top: "90px", zIndex: 10 }}>
            <div className="card bg-white border border-light-subtle rounded-4 shadow-sm p-4">
              <div className="mb-4">
                <h5 className="fw-bold text-dark mb-1">Room Share Selection</h5>
                <p className="text-muted small mb-0">
                  Select your preferred room layout
                </p>
              </div>

              {/* Loop Mapping across Room Schemas Options */}
              {pgDetails.rooms.map((room) => (
                <div
                  key={room.room_id}
                  className={`p-3 border rounded-3 mb-3 transition-all ${
                    !room.is_available
                      ? "bg-body-tertiary border-light-subtle opacity-50"
                      : "bg-white border-light-subtle"
                  }`}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="text-capitalize fw-bold text-dark d-block small mb-0">
                        {room.room_type} Sharing
                      </span>
                      <small
                        className="text-muted"
                        style={{ fontSize: "0.75rem" }}
                      >
                        Capacity: {room.capacity}{" "}
                        {room.capacity === 1 ? "Resident" : "Residents"}
                      </small>
                    </div>

                    <div className="text-end">
                      <span className="fw-bold text-dark d-block small">
                        ₹{room.price}
                        <span
                          className="text-muted fw-normal"
                          style={{ fontSize: "0.7rem" }}
                        >
                          /mo
                        </span>
                      </span>

                      {room.is_available ? (
                        <Link
                          to={`/booking/${room.room_id}`}
                          className="btn btn-dark btn-sm rounded-pill px-3 mt-2 fw-medium"
                          style={{ fontSize: "0.75rem" }}
                        >
                          Select
                        </Link>
                      ) : (
                        <span
                          className="badge bg-light text-muted border border-light-subtle rounded-pill px-2.5 py-1 mt-2 d-inline-block fw-medium"
                          style={{ fontSize: "0.7rem" }}
                        >
                          Filled
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <p
                className="text-center text-muted small mt-2 mb-0"
                style={{ fontSize: "0.7rem" }}
              >
                * Prices shown exclude standard security deposits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PgDetails;
