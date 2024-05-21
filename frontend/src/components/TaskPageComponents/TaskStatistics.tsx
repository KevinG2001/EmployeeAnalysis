import style from "../../styles/tasks/TaskStatistics.module.scss";
import useTasksStats from "../../util/taskStatsUtil";
import TaskBarChart from "./Stats/TaskDoughnutChart";

function TaskStatistics() {
  // ! Make type for stats
  const { stats }: any = useTasksStats("amountOfTasks");
  const { stats: percentageStats }: any = useTasksStats("percentages");

  return (
    <>
      <div className={style.taskStatContainer}>
        Task Statistics
        <div>
          <TaskBarChart />
        </div>
        <div className={style.textWrapper}>
          <div>OverDue: {stats.overdueCount}</div>
          <div>Not Completed: {stats.upComingTaskCount}</div>
          <div>Assigned: {stats.assignedTaskCount}</div>
          <div>Total: {stats.totalTaskCount}</div>
          <div>Open: {percentageStats.closedTaskPercentage}%</div>
          <div>Closed: {percentageStats.completedTaskPercentage}%</div>
        </div>
      </div>
    </>
  );
}

export default TaskStatistics;
