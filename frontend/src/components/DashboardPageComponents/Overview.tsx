
import React from "react";
import Styles from "../../styles/home.module.scss";

const Overview = () => {
  return (
    <div className={Styles.overviewContainer}>
      <h2 className={Styles.title}>Overview</h2>
      <div className={Styles.statsContainer}>
        <div className={Styles.statItem}>
          <h3>Overall Stat</h3>
          <p>{`Data or Summary Here`}</p>
        </div>
        <div className={Styles.statItem}>
          <h3>Weekly Change</h3>
          <p>{`Data or Summary Here`}</p>
        </div>
        <div className={Styles.statItem}>
          <h3>Weekly Change %</h3>
          <p>{`Data or Summary Here`}</p>
        </div>
      </div>
    </div>
  );
}

export default Overview;

