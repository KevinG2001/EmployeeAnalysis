import React from "react";
import Styles from "../../styles/home.module.scss";

function Overview() {
  return (
    <div className={Styles.greyBox}>
      <h2>Overview</h2>
      <div>
        <div>{`{Overall Stat}`}</div>
        <div>{`{Weekly change}`}</div>
        <div>{`{Weekly change %}`}</div>
      </div>
    </div>
  );
}

export default Overview;
