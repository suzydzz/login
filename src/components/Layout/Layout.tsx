import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Navigation } from "./Navigation";
import styles from "./Layout.module.css";

export const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>
        <Navigation />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
