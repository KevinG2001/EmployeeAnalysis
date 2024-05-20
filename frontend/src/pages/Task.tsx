import TaskDashboard from "../components/TaskPageComponents/TaskDashboard";
import TaskStatistics from "../components/TaskPageComponents/TaskStatistics";
import style from "../styles/tasks/TaskPage.module.scss";

function Task() {
  return (
    <>
      <div className={style.taskContainer}>
        {/* Left */}
        <div className={style.leftWrapper}>
          <TaskDashboard />
        </div>
        {/* Right */}
        <div className={style.rightWrapper}>
          <TaskStatistics />
        </div>
      </div>
    </>
  );
}

export default Task;
