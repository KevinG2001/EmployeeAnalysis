import React from "react";
import Styles from "../../styles/home.module.scss";

function Overview() {
  return (
    <div className={Styles.greyBox}>
      <h2>Overview</h2>
      <div>
        <p>{`{Overall Stat}`}</p>
        <p>{`{Weekly change}`}</p>
        <p>{`{Weekly change %}`}</p>
      </div>
    </div>
  );
}

export default Overview;
