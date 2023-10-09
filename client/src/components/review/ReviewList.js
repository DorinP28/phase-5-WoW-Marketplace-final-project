import React, { useState, useEffect } from "react";

function renderStars(rating) {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(
        <span key={i} style={{ color: "#FFD700" }}>
          ★
        </span>
      );
    } else {
      stars.push(
        <span key={i} style={{ color: "#d4d4d4" }}>
          ★
        </span>
      );
    }
  }
  return stars;
}

function ReviewList({ carId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch reviews for this car
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/cars/${carId}/reviews`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error.message);
      }
    };

    fetchReviews();
  }, [carId]);

  return (
    <div className="review-list-container">
      {reviews.map((review, index) => (
        <div className="review-item" key={index}>
          <strong className="review-username">{review.username}</strong>
          <div>{renderStars(review.rating)}</div>
          <p>{review.content}</p>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;
