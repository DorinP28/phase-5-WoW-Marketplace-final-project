import React, { useContext } from "react";
import UserContext from "./user/UserContext";
import { Link } from "react-router-dom";

const navStyle = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  padding: "0.5rem 0",
  background: "#333",
};

const linkStyle = {
  textDecoration: "none",
  margin: "0 0.25rem",
  color: "white",
  fontSize: "0.9rem",
};

const NavBar = () => {
  const { user } = useContext(UserContext);

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>
        Home
      </Link>
      <Link to="/cars" style={linkStyle}>
        Cars
      </Link>
      <Link to="/messages" style={linkStyle}>
        Messages
      </Link>
      {user ? (
        <>
          <Link to="/post-car" style={linkStyle}>
            Sell
          </Link>
          <Link to={`/profile/${user.username}`} style={linkStyle}>
            {user.username}
          </Link>
          <Link to="/logout" style={linkStyle}>
            Logout
          </Link>
        </>
      ) : (
        <>
          <Link to="/login" style={linkStyle}>
            Login
          </Link>
          <Link to="/register" style={linkStyle}>
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
