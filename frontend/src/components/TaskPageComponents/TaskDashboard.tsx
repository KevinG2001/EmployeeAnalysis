import style from "../../styles/tasks/taskDashboard.module.scss";
import TaskTable from "./TaskTable";
import Taskbubbles from "./TaskBubbles";

function TaskDashboard() {
  return (
    <>
      <div className={style.taskDashboardContainer}>
        <Taskbubbles />
        <TaskTable />
      </div>
    </>
  );
}

export default TaskDashboard;
