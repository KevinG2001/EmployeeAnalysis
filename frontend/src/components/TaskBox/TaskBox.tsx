import React, { useState } from "react";
import Tasks from "./Tasks";
import Styles from "../../styles/Tasks.module.scss";
import { useUser } from "../../util/userUtil";
import CreateTask from "./CreateTask";
import CompletedTasks from "./CompletedTasks";

function TaskBox() {
  const user = useUser();
  const [panelPointer, setPanelPointer] = useState("Assigned Tasks");
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
            Assigned Tasks
          </div>
          <div onClick={handleClick} className={Styles.taskBtn}>
            Completed Tasks
          </div>
          <div onClick={handleClick} className={Styles.taskBtn}>
            Available Tasks
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
            <CompletedTasks />
          ) : panelPointer === "Available Tasks" ? (
            <div>Available Tasks</div>
          ) : panelPointer === "Assigned Tasks" ? (
            <Tasks />
          ) : (
            panelPointer === "Create New Task" && <CreateTask />
          )}
        </div>
      </div>
    </>
  );
}

export default TaskBox;
