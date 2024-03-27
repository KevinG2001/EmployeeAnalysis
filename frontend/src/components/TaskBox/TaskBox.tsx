import { useState } from "react";
import Tasks from "./Tasks";
import Styles from "../../styles/Tasks.module.scss";
import { useUser } from "../../util/userUtil";
import CreateTask from "./CreateTask";
import CompletedTasks from "./CompletedTasks";
import AvailableTasks from "./AvailableTasks";

function TaskBox() {
  const user = useUser();
  const [panelPointer, setPanelPointer] = useState("Assigned Tasks");

  const panelComponents = {
    "Completed Tasks": <CompletedTasks />,
    "Available Tasks": <AvailableTasks />,
    "Assigned Tasks": <Tasks />,
    "Create New Task": user?.isAdmin && <CreateTask />,
  };

  const handleClick = (e) => {
    const divName = e.target.textContent;
    setPanelPointer(divName);
  };

  return (
    <div className={Styles.container}>
      {/* Buttons */}
      <div className={Styles.sidebar}>
        {Object.keys(panelComponents).map(
          (panel, index) =>
            panelComponents[panel] && (
              <div key={index} onClick={handleClick} className={Styles.taskBtn}>
                {panel}
              </div>
            )
        )}
      </div>
      {/* Content */}
      <div className={Styles.contentPanel}>{panelComponents[panelPointer]}</div>
    </div>
  );
}

export default TaskBox;
