import React, { useState } from "react";
import Tasks from "./Tasks";
import Styles from "../../styles/Tasks.module.scss";
import { useUser } from "../../util/userUtil";
import CreateTask from "./CreateTask";

function TaskBox() {
  const user = useUser();
  const [panelPointer, setPanelPointer] = useState("Completed");
  const handleClick = (e) => {
    const divName = e.target.textContent;
    setPanelPointer(divName);
  };

  return (
    <>
      <div className={Styles.container}>
        {/* Buttons */}
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
          {user?.isAdmin && (
            <div onClick={handleClick} className={Styles.taskBtn}>
              Create New Task
            </div>
          )}
        </div>
        {/* Content */}
        <div className={Styles.contentPanel}>
          {panelPointer === "Completed Tasks" ? (
            <Tasks />
          ) : panelPointer === "Available Tasks" ? (
            <div>Available Tasks</div>
          ) : panelPointer === "Your Tasks" ? (
            <div>Your Tasks</div>
          ) : (
            panelPointer === "Create New Task" && <CreateTask />
          )}
        </div>
      </div>
    </>
  );
}

export default TaskBox;
