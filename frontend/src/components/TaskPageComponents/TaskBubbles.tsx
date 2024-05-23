import style from "../../styles/tasks/TaskBubbles.module.scss";
import useTasksStats from "../../util/taskStatsUtil";

function TaskBubbles() {
  const { stats }: any = useTasksStats("amountOfTasks");
  return (
    <>
      <div className={style.bubbleContainer}>
        <div className={style.bubble}>
          <div className={style.leftSide}>Img</div>
          <div className={style.rightSide}>
            <div>{stats.totalTaskCount}</div>
            <div>Total Tasks</div>
          </div>
        </div>
        <div className={style.bubble}>
          <div className={style.leftSide}>Img</div>
          <div className={style.rightSide}>
            <div>{stats.notCompleteCount}</div>
            <div>Not Complete</div>
          </div>
        </div>
        <div className={style.bubble}>
          <div className={style.leftSide}>Img</div>
          <div className={style.rightSide}>
            <div>{stats.overdueCount}</div>
            <div>Overdue</div>
          </div>
        </div>
        <div className={style.bubble}>
          <div className={style.leftSide}>Img</div>
          <div className={style.rightSide}>
            <div>{stats.upComingTaskCount}</div>
            <div>Upcoming</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskBubbles;
