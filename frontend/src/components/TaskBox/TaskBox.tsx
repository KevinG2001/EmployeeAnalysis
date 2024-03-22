import React, { useState } from "react";
import Tasks from "./Tasks";
import Styles from "../../styles/Tasks.module.scss";

function TaskBox() {
  const [panelPointer, setPanelPointer] = useState("Completed");
  const handleClick = (e) => {
    const divName = e.target.textContent;
    setPanelPointer(divName);
  };

  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.sidebar}>
          <div onClick={handleClick} className={Styles.taskBtn}>
            Completed Tasks
          </div>
          <div onClick={handleClick} className={Styles.taskBtn}>
            Available Tasks
          </div>
          <div onClick={handleClick} className={Styles.taskBtn}>
            Your Tasks
          </div>
        </div>
        <div className={Styles.contentPanel}>
          {panelPointer === "Completed Tasks" ? (
            <Tasks />
          ) : panelPointer === "Available Tasks" ? (
            <div>Available Tasks</div>
          ) : (
            panelPointer === "Your Tasks" && <div>Your Tasks</div>
          )}
        </div>
      </div>
    </>
  );
}

export default TaskBox;
