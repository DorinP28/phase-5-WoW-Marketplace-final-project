import React, { useState } from "react";

function AddReview({ carId, loggedInUser }) {
  const [username, setUsername] = useState(loggedInUser || "");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      content,
      rating,
    };

    try {
      const response = await fetch(`/cars/${carId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      window.location.reload();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error.message);
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}>
        {!loggedInUser && <input type="text" placeholder="Username (optional)" value={username} onChange={(e) => setUsername(e.target.value)} />}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Your Review"
          style={{ resize: "vertical", marginTop: "10px" }}
        ></textarea>

        {/* Star Rating System */}
        <div style={{ marginTop: "10px", display: "flex", justifyContent: "start" }}>
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <span
                key={index}
                onClick={() => handleStarClick(ratingValue)}
                style={{
                  cursor: "pointer",
                  fontSize: "24px",
                  color: ratingValue <= rating ? "gold" : "gray",
                  marginRight: "5px",
                }}
              >
                ★
              </span>
            );
          })}
        </div>

        <button type="submit" style={{ marginTop: "10px", alignSelf: "center" }}>
          Add Review
        </button>
      </form>
    </div>
  );
}

export default AddReview;
