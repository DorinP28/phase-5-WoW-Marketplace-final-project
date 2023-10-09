import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "./UserContext";

function Logout() {
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    const performLogout = async () => {
      try {
        const response = await fetch("/logout", {
          method: "POST",
          credentials: "include",
        });

        if (response.ok) {
          setUser(null);
          history.push("/");
        } else {
          console.error("Failed to logout:", response.statusText);
        }
      } catch (error) {
        console.error("There was an error during logout:", error);
      }
    };

    performLogout();
  }, [history, setUser]);

  return null;
}

export default Logout;
