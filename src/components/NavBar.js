import React from "react";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import axios from "axios";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  console.log("Current user:", currentUser); // Log the context value

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const loggedOutIcons = (
    <>
      <li className="nav-item">
        <NavLink to="/signin" className="nav-link text-muted">
          SignIn
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/signup" className="nav-link text-muted">
          SignUp
        </NavLink>
      </li>
    </>
  );

  const loggedInIcons = (
    <>
      <li className="nav-item text-muted">Welcome, {currentUser?.username}</li>
      <li className="nav-item">
        <NavLink to="/" className="nav-link text-muted" onClick={handleSignOut}>
          Logout
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container d-flex justify-content-between align-items-center">
        {/* <NavLink to="/" className="navbar-brand">
          MyApp
        </NavLink> */}
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto d-flex align-items-center ml-2">
            {currentUser ? loggedInIcons : loggedOutIcons}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
