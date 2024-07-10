import React from "react";
import Styles from "../../styles/home.module.scss";

function YourTeam() {
  return (
    <div className={Styles.greyBox}>
      <h2>Your Team</h2>
      <div>
        <p>First Name</p>
        <p>Email@email.com</p>
      </div>
      <div>
        <p>First Name</p>
        <p>Email@email.com</p>
      </div>
    </div>
  );
}

export default YourTeam;
