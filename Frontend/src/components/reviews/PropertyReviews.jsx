import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getreviews } from "../../services/rewiews";
import { toast } from "react-toastify";

const PropertyReviews = () => {
  const { id } = useParams();

  const [reviews, setReviews] = useState([]);

  const loadReviews = async () => {
    try {
      const result = await getreviews(id);

      if (result.status === "success") {
        setReviews(result.data);
      }
    } catch (error) {
      toast.error("Failed to load reviews");
    }
  };

  useEffect(() => {
    loadReviews();
  }, [id]);

  return (
    <div>
      {reviews.map((review) => (
        <div key={review.id} className="card mb-3">
          <div className="card-body">
            <h5>{review.tenantName}</h5>
            <p> {review.rating}</p>
            <p>{review.comments}</p>
            <small>
              {new Date(review.date).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyReviews;
