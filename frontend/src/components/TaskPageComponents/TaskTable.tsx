import { useState } from "react";
import style from "../../styles/tasks/TaskTable.module.scss";
import CompletedTasks from "./TaskBox/CompletedTasks";
import AvailableTasks from "./TaskBox/AvailableTasks";
import AssignedTasks from "./TaskBox/AssignedTasks";

const panels = {
  ASSIGNED: "Assigned to you",
  COMPLETED: "Completed",
  AVAILABLE: "Available Tasks",
} as const;

type Panel = (typeof panels)[keyof typeof panels];

const panelComponents = {
  [panels.COMPLETED]: <CompletedTasks />,
  [panels.AVAILABLE]: <AvailableTasks />,
  [panels.ASSIGNED]: <AssignedTasks />,
};

function TaskTable() {
  const [panelPointer, setPanelPointer] = useState<Panel>(panels.ASSIGNED);

  const handleClick = (panel: Panel) => {
    setPanelPointer(panel);
  };

  return (
    <div className={style.tableContainer}>
      <div className={style.btnWrapper}>
        {Object.values(panels).map((panel, index) => (
          <div
            key={index}
            onClick={() => handleClick(panel)}
            className={`${style.btn} ${
              panelPointer === panel ? style.active : ""
            }`}
          >
            {panel}
          </div>
        ))}
      </div>
      {panelComponents[panelPointer]}
    </div>
  );
}

export default TaskTable;
