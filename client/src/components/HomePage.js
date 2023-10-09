import React from "react";
import { Link } from "react-router-dom";

const sectionStyle = {
  flex: "1",
  padding: "1rem",
  textAlign: "center",
};

const HomePage = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "calc(100vh - 100px)", paddingTop: "60px" }}>
      <div style={sectionStyle}>
        <h2>🚗 Wheels out Wanted 🚗</h2>
        <p>
          For the avid car enthusiast and the everyday commuter, "Wheels out Wanted" is your go-to destination. Dive deep into a curated selection of vehicles,
          tailored to your desires. Whether you're after luxury, economy, or a mix of both, we have the wheels you've always wanted. Don't just drive, thrive!
        </p>
      </div>

      <div style={{ ...sectionStyle, fontSize: "2rem" }}>
        <Link to="/cars" style={{ textDecoration: "none", color: "inherit" }}>
          Inventory
        </Link>
      </div>

      <div style={sectionStyle}>
        <h2>🔧 Want out Wheels 🔧</h2>
        <p>
          Ready to pass on the keys to a new driver? At "Want out Wheels", we make selling your vehicle a breeze. Whether you're upgrading, downsizing, or just
          looking for a change, connect with genuine buyers actively seeking their next drive. List your car, share its story, and let us handle the rest.
          Turning your garage space into cash space has never been easier!
        </p>
      </div>
    </div>
  );
};

export default HomePage;
