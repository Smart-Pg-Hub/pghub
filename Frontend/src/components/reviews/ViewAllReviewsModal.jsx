import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import ReviewCard from "./ReviewCard";

const ViewAllReviewsModal = ({
  show,
  onHide,
  reviews = [],
  averageRating = 0,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered size="lg" scrollable>
      <Modal.Header closeButton>
        <Modal.Title>
          <div>
            <h5 className="fw-bold mb-1">Customer Reviews</h5>

            <div className="d-flex align-items-center">
              <FaStar className="text-warning me-2" />

              <span className="fw-semibold">{averageRating}</span>

              <span className="text-muted ms-2">
                ({reviews.length} Reviews)
              </span>
            </div>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body
        style={{
          maxHeight: "70vh",
          overflowY: "auto",
        }}
      >
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <div className="text-center py-5">
            <h5>No Reviews Yet</h5>

            <p className="text-muted mb-0">
              Be the first tenant to review this PG.
            </p>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onHide}
          className="rounded-pill px-4"
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewAllReviewsModal;
