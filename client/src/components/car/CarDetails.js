import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import AddReview from "../review/AddReview";
import ReviewList from "../review/ReviewList";

function CarDetails({ match }) {
  const [car, setCar] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [contactDetails, setContactDetails] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/cars/${match.params.carId}`);
        if (response.ok) {
          const data = await response.json();
          setCar(data);
        } else {
          console.error("Failed to fetch car details:", response.statusText);
        }
      } catch (error) {
        console.error("There was an error fetching the car details:", error);
      }

      const userResponse = await fetch(`/check_session`, {
        credentials: "include",
      });
      if (userResponse.ok) {
        const userData = await userResponse.json();
        if (userData.username) {
          setLoggedInUser(userData.username);
        }
      }
    }
    fetchData();
  }, [match.params.carId]);

  const handleSendMessage = async () => {
    try {
      const response = await fetch(`/send-message/${car.owner.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          content: message,
          car_id: car.id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message) {
          alert(data.message);
        }
        setModalOpen(false);
      } else {
        console.error("Failed to send message:", response.statusText);
      }
    } catch (error) {
      alert("Error sending message.");
    }
  };

  const handleOpenModal = async () => {
    try {
      const response = await fetch(`/users/${car.owner.id}`, {
        credentials: "include", // Include credentials in the request
      });
      if (response.ok) {
        const data = await response.json();
        setContactDetails(data.contact_details);
      } else {
        const errorText = await response.text();
        console.error("Failed to fetch contact details:", errorText);
      }
    } catch (error) {
      console.error("Error fetching contact details:", error);
    }
    setModalOpen(true);
  };

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", border: "1px solid #e0e0e0", borderRadius: "8px" }}>
      <div className="car-detail-content">
        {car.images && <img src={`/${car.images}`} alt={`${car.make} ${car.model}`} className="car-detail-image" />}

        <div className="car-detail-text">
          <h2>
            {car.make} {car.model} ({car.year})
          </h2>
          <p>Price: ${car.price}</p>
          {car.owner && <p>Seller: {car.owner.username}</p>}
          <button
            onClick={handleOpenModal}
            style={{ backgroundColor: "#007bff", color: "#fff", padding: "10px 15px", borderRadius: "4px", border: "none", cursor: "pointer" }}
          >
            Contact Seller
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)}>
        <h2>Contact {car.owner.username}</h2>
        <p>Contact Details: {contactDetails}</p>

        <textarea
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message..."
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <button
          onClick={handleSendMessage}
          style={{ backgroundColor: "#007bff", color: "#fff", padding: "10px 15px", borderRadius: "4px", border: "none", cursor: "pointer" }}
        >
          Send
        </button>
      </Modal>

      <div style={{ marginTop: "30px", border: "1px solid #e0e0e0", padding: "20px", borderRadius: "8px" }}>
        <h3>Add a Review:</h3>
        <AddReview carId={car.id} loggedInUser={loggedInUser || `Unregistered User ${Math.floor(Math.random() * 1000)}`} />
      </div>

      <div style={{ marginTop: "30px" }}>
        <h3>Reviews:</h3>
        <ReviewList carId={car.id} />
      </div>
    </div>
  );
}

export default CarDetails;
