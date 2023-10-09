import React, { useState, useEffect } from "react";

function SendMessage({ sellerId, sellerUsername }) {
  const [messageContent, setMessageContent] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [contactDetails, setContactDetails] = useState("");

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await fetch(`/get-contact-details/${sellerId}`);
        if (response.ok) {
          const data = await response.json();
          setContactDetails(data.contact_details);
        } else {
          console.error("Failed to fetch seller contact details");
        }
      } catch (error) {
        console.error("There was an error fetching the seller's contact details:", error);
      }
    };

    fetchContactDetails();
  }, [sellerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const messageResponse = await fetch(`/send-message/${sellerId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          content: messageContent,
        }),
      });

      if (messageResponse.ok) {
        const messageData = await messageResponse.json();
        if (messageData.message) {
          setSuccessMessage("Message sent successfully.");
        } else {
          setError("Error sending message.");
        }
      } else {
        setError("Error sending message. " + messageResponse.statusText);
      }
    } catch (err) {
      setError("Error sending message.");
    }
  };

  return (
    <div className="send-message-container">
      <h2>Contact {sellerUsername}</h2>
      <div className="contact-info">
        <strong>Contact Details:</strong> {contactDetails || "Not provided"}
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          Message:
          <textarea value={messageContent} onChange={(e) => setMessageContent(e.target.value)} required></textarea>
        </label>
        <button type="submit">Send</button>
      </form>
      <div className="send-message-feedback">
        {error && <p className="error-feedback">{error}</p>}
        {successMessage && <p className="success-feedback">{successMessage}</p>}
      </div>
    </div>
  );
}

export default SendMessage;
