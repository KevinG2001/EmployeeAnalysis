
import React, { useState } from "react";
import Styles from "../../styles/home.module.scss";

// Initial list of employees
const initialEmployees = [
  { name: "John Doe", email: "john.doe@example.com" },
  { name: "Jane Smith", email: "jane.smith@example.com" },
  { name: "Kevin", email: "kevin@gmail.com" },
];

function YourTeam() {
  // State to toggle between showing all employees or just a few
  const [showAll, setShowAll] = useState(false);

  // Function to toggle the view
  const toggleView = () => {
    setShowAll(!showAll);
  };

  return (
    <div className={Styles.yourTeamContainer}>
      <div className={Styles.header}>
        <h2 className={Styles.title}>Your Team</h2>
        <button className={Styles.toggleButton} onClick={toggleView}>
          {showAll ? "Hide" : "View All"}
        </button>
      </div>
      <div className={Styles.employeeList}>
        {initialEmployees.slice(0, showAll ? undefined : 2).map((employee, index) => (
          <div key={index} className={Styles.employeeRow}>
            <div className={Styles.employeeName}>{employee.name}</div>
            <div className={Styles.employeeEmail}>{employee.email}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YourTeam;
