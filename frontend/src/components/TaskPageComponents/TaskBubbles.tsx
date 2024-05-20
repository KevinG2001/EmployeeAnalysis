import style from "../../styles/tasks/TaskBubbles.module.scss";
import useTasks from "../../util/taskUtil";

function TaskBubbles() {
  const { tasks } = useTasks("amountOfTasks");
  return (
    <>
      <div className={style.bubbleContainer}>
        <div className={style.bubble}>
          <div className={style.leftSide}>Img</div>
          <div className={style.rightSide}>
            <div>{tasks.totalTaskCount}</div>
            <div>Total Tasks</div>
          </div>
        </div>
        <div className={style.bubble}>
          <div className={style.leftSide}>Img</div>
          <div className={style.rightSide}>
            <div>{tasks.notCompleteCount}</div>
            <div>Not Complete</div>
          </div>
        </div>
        <div className={style.bubble}>
          <div className={style.leftSide}>Img</div>
          <div className={style.rightSide}>
            <div>{tasks.overdueCount}</div>
            <div>Overdue</div>
          </div>
        </div>
        <div className={style.bubble}>
          <div className={style.leftSide}>Img</div>
          <div className={style.rightSide}>
            <div>{tasks.upComingTaskCount}</div>
            <div>Upcoming</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskBubbles;
