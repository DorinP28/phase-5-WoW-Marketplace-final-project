import React, { useState, useEffect } from "react";

function MessageList() {
  const [messages, setMessages] = useState({ sent: [], received: [] });
  const [error, setError] = useState("");
  const [showReceived, setShowReceived] = useState(true);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await fetch("/messages", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        } else {
          setError("Error fetching messages. " + response.statusText);
        }
      } catch (err) {
        setError("Error fetching messages.");
      }
    }

    fetchMessages();
  }, []);

  return (
    <div className="messages-container">
      <h2>Your Messages</h2>
      {error && <p className="error-message">{error}</p>}

      {/* Buttons for toggling */}
      <div>
        <button onClick={() => setShowReceived(true)} className={showReceived ? "active" : ""}>
          Received Messages
        </button>
        <button onClick={() => setShowReceived(false)} className={!showReceived ? "active" : ""}>
          Sent Messages
        </button>
      </div>

      {/* Conditional rendering based on the toggle state */}
      {showReceived ? (
        <div>
          <h3>Received Messages</h3>
          <ul className="messages-list">
            {messages.received.map((message) => (
              <li key={message.id}>
                <strong>From:</strong> {message.sender_username} <br />
                <strong>Message:</strong> {message.content}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h3>Sent Messages</h3>
          <ul className="messages-list">
            {messages.sent.map((message) => (
              <li key={message.id}>
                <strong>To:</strong> {message.recipient_username} <br />
                <strong>Message:</strong> {message.content}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MessageList;
