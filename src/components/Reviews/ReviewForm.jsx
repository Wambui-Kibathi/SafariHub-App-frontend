import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { createReview } from "../../api/reviewApi";
import "../../styles/form.css";

const ReviewForm = ({ destinationId, onReviewAdded }) => {
  const { auth } = useAuth();
  const [review, setReview] = useState({ rating: 0, comment: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReview(destinationId, review, auth.token);
      setMessage("Review added successfully!");
      setReview({ rating: 0, comment: "" });
      onReviewAdded && onReviewAdded();
    } catch {
      setMessage("Error adding review.");
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h3>Leave a Review</h3>
      <label>Rating:</label>
      <input
        type="number"
        name="rating"
        value={review.rating}
        onChange={(e) => setReview({ ...review, rating: e.target.value })}
        min="1"
        max="5"
        required
      />
      <label>Comment:</label>
      <textarea
        name="comment"
        value={review.comment}
        onChange={(e) => setReview({ ...review, comment: e.target.value })}
        required
      ></textarea>
      <button type="submit">Submit</button>
      {message && <p className="success">{message}</p>}
    </form>
  );
};

export default ReviewForm;