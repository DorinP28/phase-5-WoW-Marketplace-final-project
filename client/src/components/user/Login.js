import React, { useState, useContext } from "react";
import UserContext from "./UserContext";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginResponse = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const loginData = await loginResponse.json();
      setMessage(loginData.message);

      if (loginResponse.ok) {
        const userResponse = await fetch("/check_session", { credentials: "include" });
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData);
          history.push("/"); // Redirect to the HomePage
        } else {
          console.error("Failed to fetch user session:", userResponse.statusText);
          setMessage("Failed to fetch user session.");
        }
      } else {
        setMessage("Login failed.");
      }
    } catch (error) {
      console.error("There was an error during login:", error);
      setMessage("Login failed.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ borderBottom: "2px solid #ccc", paddingBottom: "10px" }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <input
            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button style={{ padding: "10px 15px", backgroundColor: "#007bff", color: "white", borderRadius: "5px", cursor: "pointer" }} type="submit">
          Login
        </button>
      </form>
      {message && <p style={{ color: "red", marginTop: "10px" }}>{message}</p>}
    </div>
  );
}

export default Login;
