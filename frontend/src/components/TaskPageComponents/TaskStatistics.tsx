import style from "../../styles/tasks/TaskStatistics.module.scss";
import useTasksStats from "../../util/taskStatsUtil";
import TaskBarChart from "./Stats/TaskDoughnutChart";

function TaskStatistics() {
  const { stats } = useTasksStats("amountOfTasks");
  const { stats: percentageStats } = useTasksStats("percentages");

  return (
    <>
      <div className={style.taskStatContainer}>
        Task Statistics
        <div>
          <TaskBarChart />
        </div>
        <div className={style.textWrapper}>
          <div>OverDue: </div>
          <div>Not Completed: {stats.upComingTaskCount}</div>
          <div>Assigned: {stats.assignedTaskCount}</div>
          <div>Total: {stats.totalTaskCount}</div>
          <div>Total Completed: {percentageStats.completedTaskPercentage}%</div>
        </div>
      </div>
    </>
  );
}

export default TaskStatistics;
