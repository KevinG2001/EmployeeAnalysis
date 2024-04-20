import React, { useState, useEffect } from "react";
import Styles from "../styles/home.module.scss";
import Statistics from "../components/statistics/StatisticsBox";
import Overview from "../components/statistics/Overview";
import TaskBox from "../components/TaskBox/TaskBox";
import EmployeeBox from "../components/EmployeeBox/EmployeeBox";
import { useUser } from "../util/userUtil";
import profilePic from "../assets/profilePicPlaceholder.svg";
import LogoutModal from "../components/modals/LogoutModal";

function Home() {
  const user = useUser();
  const [showModal, setShowModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  const toggleModal = (event: any) => {
    const rect = event.target.getBoundingClientRect();
    const x = rect.left + window.scrollX;
    const y = rect.bottom + window.scrollY;
    setModalPosition({ x, y });
    setShowModal(!showModal);
  };

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Redirect the user to the login page or any other desired location
    window.location.href = "/";
  };

  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.wrapper}>
          <div className={Styles.headerWrapper}>
            <p className={Styles.title}>Welcome {user?.firstname}</p>
            <img
              src={profilePic}
              alt="Profile Picture"
              className={Styles.profilePic}
              onClick={toggleModal}
            />
            {showModal && (
              <LogoutModal onLogout={handleLogout} position={modalPosition} />
            )}
          </div>
          <div className={Styles.boxContainer}>
            {/* Box 1 */}
            <div className={Styles.box}>
              <Overview />
            </div>
            {/* Box 2  */}
            <div className={Styles.box}>
              <Statistics />
            </div>
            {/* Box 3 */}
            <div className={Styles.box}>
              <TaskBox />
            </div>
            {/* Box 4 & 5 if admin */}
            {/* Conditionally render additional components based on user's permissions */}
            {user?.isAdmin && (
              <>
                <div className={Styles.box}>
                  <EmployeeBox />
                </div>
                {/* <div className={Styles.box}>Admin Box 2</div> */}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
