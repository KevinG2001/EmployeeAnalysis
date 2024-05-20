import Styles from "../../styles/BoxCards/tasks.module.scss";
import listStyles from "../../styles/BoxCards/tableStyle.module.scss";
import useTasks from "../../util/taskUtil";

function Tasks() {
  const { tasks, isLoading } = useTasks("assignedtasks");

  return (
    <div className={Styles.container}>
      {isLoading ? (
        <p>Loading...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks assigned to you</p>
      ) : (
        <table className={listStyles.listContainer}>
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Title</th>
              <th>Difficulty</th>
              <th>Priority</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.task_id}>
                <td>{task.task_id}</td>
                <td>{task.task_name}</td>
                <td>{task.task_difficulty}</td>
                <td>{task.task_priority}</td>
                <td>{task.task_duedate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Tasks;
