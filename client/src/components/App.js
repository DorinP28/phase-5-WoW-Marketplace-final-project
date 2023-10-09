import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Importing the components
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import Login from "./user/Login";
import Register from "./user/Register";
import UserProfile from "./user/UserProfile";
import CarList from "./car/CarList";
import CarDetails from "./car/CarDetails";
import MessageList from "./message/MessageList";
import SendMessage from "./message/SendMessage";
import NotFound from "./NotFound";
import UserContext from "./user/UserContext";
import Logout from "./user/Logout";
import PostCar from "./car/PostCar";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/check_session", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          throw new Error("Failed to check session");
        }
      } catch (error) {
        setUser(null);
      }
    };

    checkSession();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <NavBar />
        <div style={{ padding: "20px" }}></div>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={UserProfile} />
          <Route path="/cars" exact component={CarList} />
          <Route path="/car/:carId" component={CarDetails} />
          <Route path="/messages" exact component={MessageList} />
          <Route path="/sendmessage" component={SendMessage} />
          <Route path="/logout" component={Logout} />
          <Route path="/profile/:username" component={UserProfile} />
          <Route path="/post-car" component={PostCar} />
          {/* Add more routes as needed */}
          <Route component={NotFound} /> {/* This should always be the last Route */}
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
