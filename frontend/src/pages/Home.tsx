import React, { useState, useEffect } from "react";
import Styles from "../styles/home.module.scss";
import Efficency from "../components/statistics/Efficency";
import Overview from "../components/statistics/Overview";
import TaskBox from "../components/TaskBox/TaskBox";
import { useUser } from "../util/userUtil";

function Home() {
  const user = useUser();

  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.wrapper}>
          <p className={Styles.title}>Welcome {user?.firstname}</p>
          <div className={Styles.boxContainer}>
            {/* Box 1 */}
            <div className={Styles.box}>
              <Overview />
            </div>
            {/* Box 2  */}
            <div className={Styles.box}>
              <Efficency />
            </div>
            {/* Box 3 */}
            <div className={Styles.box}>
              <TaskBox />
            </div>
            {/* Box 4 & 5 if admin */}
            {/* Conditionally render additional components based on user's permissions */}
            {user?.isAdmin && (
              <>
                {/* <div className={Styles.box}>Admin Box 1</div> */}
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
