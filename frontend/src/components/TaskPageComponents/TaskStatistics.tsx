import style from "../../styles/tasks/TaskStatistics.module.scss";
import useTasks from "../../util/taskUtil";
import TaskBarChart from "./Stats/TaskDoughnutChart";

function TaskStatistics() {
  const { tasks } = useTasks("amountOfTasks");

  return (
    <>
      <div className={style.taskStatContainer}>
        Task Statistics
        <div>
          <TaskBarChart />
        </div>
        <div>OverDue: </div>
        <div>Not Completed: {tasks.upComingTaskCount}</div>
        <div>Assigned: {tasks.assignedTaskCount}</div>
        <div>Total: {tasks.totalTaskCount}</div>
      </div>
    </>
  );
}

export default TaskStatistics;
