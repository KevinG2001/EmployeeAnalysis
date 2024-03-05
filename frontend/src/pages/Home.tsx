import React from "react";
import Styles from "../styles/home.module.scss";
import Efficency from "../components/statistics/Efficency";
import Overview from "../components/statistics/Overview";
function Home() {
  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.wrapper}>
          <p className={Styles.title}>Welcome Username</p>
          <div className={Styles.boxContainer}>
            <div className={Styles.box}>
              <Overview />
            </div>
            <div className={Styles.box}>
              <Efficency />
            </div>
            <div className={Styles.box}>Box 3</div>
            <div className={Styles.box}>Box 4</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
