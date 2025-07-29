
import { useAuth } from "../../context/AuthContext";
import styles from "./Header.module.css";

export const Header = () => {
  const { logout, isAuthenticated } = useAuth();

  return (
    <header className={styles.header}>
      <h1>User Management System</h1>
      {isAuthenticated && (
        <button onClick={logout} className={styles.logoutButton}>
          Logout
        </button>
      )}
    </header>
  );
};
