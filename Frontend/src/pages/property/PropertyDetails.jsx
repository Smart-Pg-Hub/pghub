import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPropertyById } from "../../services/property";
import { getRooms } from "../../services/room";
import WriteReviewModal from "../../components/reviews/WriteReviewModal";
import PropertyHeader from "./../../components/property/PropertyHeader";
import RoomList from "./../rooms/RoomList";
import ViewAllReviewsModal from "./../../components/reviews/ViewAllReviewsModal";
import ReviewSection from "./../../components/reviews/ReviewSection";
import { addreviews, getreviews } from "../../services/rewiews";
import { toast } from "react-toastify";

const PropertyDetails = () => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [rooms, setRooms] = useState([]);
  const token = sessionStorage.getItem("token");

  const user = JSON.parse(sessionStorage.getItem("user"));

  const loadProperty = async () => {
    const result = await getPropertyById(id);

    if (result.status === "success") {
      setProperty(result.data);
    }
  };

  const loadRooms = async () => {
    const result = await getRooms(id, token);

    if (result.status === "success") {
      setRooms(result.data);
    }
  };

  const [reviews, setReviews] = useState([]);

  const handleReviewSubmit = async (review) => {
    const data = {
      propertyId: property.id,
      tenantId: user.id,
      rating: review.rating,
      comments: review.comments,
    };

    try {
      const result = await addreviews(data);
      if (result.status === "success") {
        setReviews((prevReviews) => [result.data, ...prevReviews]);
        setShowReviewModal(false);
      }
    } catch (error) {
      toast.error("Review submit failed");
      console.log(error);
    }
  };

  const loadReviews = async (id) => {
    try {
      const result = await getreviews(id);
      if (result.status === "success") {
        setReviews(result.data);
        console.log(result.data);
      }
    } catch (error) {
      toast.error("Review submit failed");
      console.log(error);
    }
  };

  useEffect(() => {
    loadProperty();
    loadRooms();
    loadReviews(id);
  }, [id]);

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className="container mt-4">
      {property ? (
        <>
          <PropertyHeader property={property} averageRating={averageRating} />

          <div className="mt-4">
            <h3 className="fw-bold mb-3">Available Rooms</h3>

            <RoomList rooms={rooms} propertyId={property.id} />
          </div>

          <ReviewSection
            reviews={reviews}
            averageRating={averageRating}
            onWriteReview={() => setShowReviewModal(true)}
            onViewAll={() => setShowAllReviews(true)}
          />
        </>
      ) : (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary"></div>

          <p className="mt-3">Loading Property...</p>
        </div>
      )}

      <ViewAllReviewsModal
        show={showAllReviews}
        onHide={() => setShowAllReviews(false)}
        reviews={reviews}
        averageRating={4.8}
      />

      <WriteReviewModal
        show={showReviewModal}
        onHide={() => setShowReviewModal(false)}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );
};

export default PropertyDetails;
