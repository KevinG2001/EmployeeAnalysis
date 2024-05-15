import React, { useState, useEffect } from "react";
import Styles from "../styles/home.module.scss";
import Statistics from "../components/statistics/StatisticsBox";
import Overview from "../components/statistics/Overview";
import TaskBox from "../components/TaskBox/TaskBox";
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
        <div className={Styles.rightPanel}>
          {/* Change this to recent Tasks */}
          <div className={Styles.longBox}>
            <TaskBox />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
