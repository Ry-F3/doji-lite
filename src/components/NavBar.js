import React, { useContext } from "react";
import styles from "../styles/NavBar.module.css"; // Import CSS Modules
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "../App";

const NavBar = () => {
  const currentUser = useContext(CurrentUserContext);

  const loggedOutIcons = (
    <>
      <li className={styles.NavbarItem}>
        <NavLink to="/signin" className={styles.NavbarLinks}>
          SignIn
        </NavLink>
      </li>
      <li className={styles.NavbarItem}>
        <NavLink to="/signup" className={styles.NavbarLinks}>
          SignUp
        </NavLink>
      </li>
    </>
  );

  const loggedInIcons = (
    <>
      <li className={styles.NavbarItem}>Welcome, {currentUser?.username}</li>
      <li className={styles.NavbarItem}>
        <NavLink to="/logout" className={styles.NavbarLinks}>
          Logout
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className={styles.Navbar}>
      <div className={styles.NavbarContainer}>
        <NavLink to="/" className={styles.NavbarLogo}>
          MyApp
        </NavLink>
        <ul className={styles.NavbarMenu}>
          <li className={styles.NavbarItem}>
            <NavLink to="/" className={styles.NavbarNavLinks}>
              Home
            </NavLink>
          </li>
          {currentUser ? loggedInIcons : loggedOutIcons}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
