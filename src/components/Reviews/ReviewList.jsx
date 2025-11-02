import { useEffect, useState } from "react";
import { getReviews } from "../../api/reviewApi";
import "../../styles/main.css";

const ReviewList = ({ destinationId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await getReviews(destinationId);
      setReviews(data);
    };
    fetchReviews();
  }, [destinationId]);

  return (
    <div className="review-list">
      <h3>Traveler Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((rev) => (
          <div key={rev.id} className="review-card">
            <p><strong>Rating:</strong> {rev.rating}/5</p>
            <p>{rev.comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;