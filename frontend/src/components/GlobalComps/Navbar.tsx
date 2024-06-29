import React, { useEffect, useState } from "react";
import { useUser } from "../../util/userUtil";
import profilePic from "../../assets/profilePicPlaceholder.svg";
import styles from "../../styles/GlobalStyles/navbarstyle.module.scss";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../util/logoutUtil";

function Navbar() {
  const user = useUser();
  const location = useLocation();
  const [activePage, setActivePage] = useState("");

  useEffect(() => {
    const currentPath = location.pathname;
    setActivePage(currentPath);
  }, [location]);

  return (
    <>
      <nav className={styles.navbarContainer}>
        <div className={styles.navWrapper}>
          <div className={styles.compWrapper}>
            <div className={styles.title}>Product Name</div>
          </div>
          <div className={styles.compWrapper}>
            <Link
              className={`${styles.navLink} ${
                activePage === "/dashboard" ? styles.active : ""
              }`}
              to={"/dashboard"}
            >
              Dashboard
            </Link>
            <Link
              className={`${styles.navLink} ${
                activePage === "/tasks" ? styles.active : ""
              }`}
              to={"/tasks"}
            >
              Tasks
            </Link>
            <Link
              className={`${styles.navLink} ${
                activePage === "/employees" ? styles.active : ""
              }`}
              to={"/employees"}
            >
              Employees
            </Link>
            <Link
              className={`${styles.navLink} ${
                activePage === "/account" ? styles.active : ""
              }`}
              to={"/account"}
            >
              Account
            </Link>
          </div>
          <div className={styles.compWrapper}>
            <div className={styles.logout}>
              <div>
                <img src={profilePic} alt="pic" className={styles.profilePic} />
              </div>
              <div>
                {user?.firstname} {user?.surname}
              </div>
              <div>{user?.email}</div>
              <button className={styles.logoutButton} onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
