import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

const ratingLabels = {
  1: "Poor 😞",
  2: "Fair 😐",
  3: "Good 🙂",
  4: "Very Good 😊",
  5: "Excellent 🤩",
};

const WriteReviewModal = ({ show, onHide, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Please select a rating.");
      return;
    }

    onSubmit({
      rating,
      comments: comment,
    });

    setRating(0);
    setHover(0);
    setComment("");

    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">Write a Review</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {/* Rating */}

          <div className="mb-4">
            <label className="fw-semibold mb-3 d-block">Overall Rating</label>

            <div className="d-flex align-items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={36}
                  className="me-2"
                  style={{
                    cursor: "pointer",
                    transition: ".2s",
                  }}
                  color={star <= (hover || rating) ? "#FFC107" : "#DEE2E6"}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(star)}
                />
              ))}

              {(hover || rating) > 0 && (
                <span className="ms-3 fw-semibold text-primary">
                  {ratingLabels[hover || rating]}
                </span>
              )}
            </div>
          </div>

          {/* Comment */}

          <div>
            <label className="fw-semibold mb-2">Your Experience</label>

            <Form.Control
              as="textarea"
              rows={5}
              maxLength={500}
              value={comment}
              placeholder="Tell others about cleanliness, food, WiFi, security, maintenance and owner behaviour..."
              onChange={(e) => setComment(e.target.value)}
              style={{
                resize: "none",
                borderRadius: "15px",
              }}
            />

            <div className="d-flex justify-content-between mt-2">
              <small className="text-muted">
                Your review helps future tenants.
              </small>

              <small className="text-muted">{comment.length}/500</small>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="light"
            className="rounded-pill px-4"
            onClick={onHide}
          >
            Cancel
          </Button>

          <Button type="submit" className="rounded-pill px-4">
            Submit Review
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default WriteReviewModal;
