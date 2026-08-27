import React from "react";
import { Card, Badge } from "react-bootstrap";
import { FaStar, FaCheckCircle } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        size={15}
        className="me-1"
        color={index < rating ? "#FFC107" : "#E4E5E9"}
      />
    ));
  };

  return (
    <Card className="border-0 shadow-sm rounded-4 mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <div className="d-flex">
            {/* Avatar */}

            <div
              className="rounded-circle bg-primary text-white fw-bold d-flex align-items-center justify-content-center"
              style={{
                width: "50px",
                height: "50px",
                fontSize: "18px",
              }}
            >
              {review.tenantName?.charAt(0).toUpperCase()}
            </div>
            <div className="ms-3">
              <h6 className="fw-bold mb-1">{review.tenantName}</h6>

              <div className="d-flex align-items-center">
                <Badge bg="success" className="rounded-pill px-2 py-1">
                  <FaCheckCircle className="me-1" />
                  Verified Tenant
                </Badge>
              </div>
            </div>
          </div>
          <small className="text-muted">
            {new Date(review.date).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </small>
        </div>
        <div className="mt-3">{renderStars(review.rating)}</div>
        <p
          className="text-muted mt-3 mb-0"
          style={{
            lineHeight: "1.7",
          }}
        >
          {review.comments}
        </p>
      </Card.Body>
    </Card>
  );
};

export default ReviewCard;
