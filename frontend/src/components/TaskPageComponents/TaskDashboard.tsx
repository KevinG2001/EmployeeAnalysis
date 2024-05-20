import style from "../../styles/tasks/taskDashboard.module.scss";
import TaskTable from "./TaskTable";

function TaskDashboard() {
  return (
    <>
      <div className={style.taskDashboardContainer}>
        <TaskTable />
      </div>
    </>
  );
}

export default TaskDashboard;
