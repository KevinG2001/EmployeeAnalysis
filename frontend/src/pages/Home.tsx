import React, { useState, useEffect } from "react";
import Styles from "../styles/home.module.scss";
import Statistics from "../components/statistics/StatisticsBox";
import Overview from "../components/statistics/Overview";
import TaskBox from "../components/TaskBox/TaskBox";
import EmployeeBox from "../components/EmployeeBox/EmployeeBox";
import { useUser } from "../util/userUtil";
import profilePic from "../assets/profilePicPlaceholder.svg";
import LogoutModal from "../components/modals/LogoutModal";
import YourTeam from "../components/YourTeam";

function Home() {
  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.leftPanel}>
          <div className={Styles.wideBox}>
            <Overview />
            <YourTeam />
          </div>
          <div className={Styles.box}>
            <Statistics />
          </div>
        </div>
        <div className={Styles.longBox}>
          {/* Change this to recent Tasks */}
          <TaskBox />
        </div>
      </div>
    </>
  );
}

export default Home;
