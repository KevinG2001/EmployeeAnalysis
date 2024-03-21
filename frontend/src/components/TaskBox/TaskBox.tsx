import React from "react";
import Tasks from "./Tasks";
import Styles from "../../styles/Tasks.module.scss";

function TaskBox() {
  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.sidebar}>
          <div>Completed Tasks</div>
          <div>Available Tasks</div>
        </div>
        <div className={Styles.contentPanel}>
          {/* When One of the buttons is clicked it will show whats needed */}
          {/* Example.. List of tasks assigned to you or completed tasks */}
          <Tasks />
        </div>
      </div>
    </>
  );
}

export default TaskBox;
