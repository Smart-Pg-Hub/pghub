import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaStar, FaPen } from "react-icons/fa";
import ReviewCard from "./ReviewCard";

const ReviewSection = ({
  reviews = [],
  averageRating = 4.8,
  onWriteReview,
  onViewAll,
}) => {
  const recentReviews = reviews.slice(0, 2);

  return (
    <Card className="border-0 shadow-sm rounded-4 mt-4">
      <Card.Body className="p-4">
        {/* Header */}

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h4 className="fw-bold mb-1">Reviews</h4>

            <div className="d-flex align-items-center">
              <FaStar className="text-warning me-2" />

              <span className="fw-semibold">{averageRating}</span>

              <span className="text-muted ms-2">
                ({reviews.length} Reviews)
              </span>
            </div>
          </div>

          <Button
            variant="primary"
            className="rounded-pill px-4"
            onClick={onWriteReview}
          >
            <FaPen className="me-2" />
            Write Review
          </Button>
        </div>

        {/* Recent Reviews */}

        {recentReviews.length > 0 ? (
          recentReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <div className="text-center text-muted py-4">
            No reviews yet.
            <br />
            Be the first to review this PG.
          </div>
        )}

        {/* View All */}

        {reviews.length > 2 && (
          <div className="text-center mt-4">
            <Button
              variant="outline-primary"
              className="rounded-pill"
              onClick={onViewAll}
            >
              View All Reviews ({reviews.length})
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ReviewSection;
