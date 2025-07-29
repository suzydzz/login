import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

export const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user/create"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Create User
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
