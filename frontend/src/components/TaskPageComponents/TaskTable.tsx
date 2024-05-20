import { useState } from "react";
import style from "../../styles/tasks/TaskTable.module.scss";
import CompletedTasks from "../TaskBox/CompletedTasks";
import AvailableTasks from "../TaskBox/AvailableTasks";
import AssignedTasks from "../TaskBox/AssignedTasks";

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

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const divName = e.currentTarget.textContent as Panel;
    setPanelPointer(divName);
  };

  return (
    <div className={style.tableContainer}>
      <div className={style.btnWrapper}>
        {Object.values(panels).map((panel, index) => (
          <div key={index} onClick={handleClick} className={style.btn}>
            {panel}
          </div>
        ))}
      </div>
      <div className={style.tableContainer}>
        {panelComponents[panelPointer]}
      </div>
    </div>
  );
}

export default TaskTable;
