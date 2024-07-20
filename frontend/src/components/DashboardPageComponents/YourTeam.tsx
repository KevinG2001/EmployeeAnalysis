import React from "react";
import Styles from "../../styles/home.module.scss";

function YourTeam() {
  return (
    <div className={Styles.greyBox}>
      <div className={Styles.title}>
        <div>Your Team</div>
        <div>View All</div>
      </div>
      <div className={Styles.employeeRow}>
        <div>First Name</div>
        <div>Email@email.com</div>
      </div>
      <div className={Styles.employeeRow}>
        <div>First Name</div>
        <div>Email@email.com</div>
      </div>
    </div>
  );
}

export default YourTeam;
