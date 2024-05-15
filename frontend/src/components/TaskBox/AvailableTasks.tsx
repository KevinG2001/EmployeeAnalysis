import Styles from "../../styles/BoxCards/tasks.module.scss";
import listStyles from "../../styles/BoxCards/tableStyle.module.scss";
import useTasks from "../../util/taskUtil";

function AvailableTasks() {
  const { tasks, isLoading, error } = useTasks("availabletasks");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={Styles.container}>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <table className={listStyles.listContainer}>
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Task Description</th>
              <th>Difficulty</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.task_id}>
                <td>{task.task_name}</td>
                <td>{task.task_description}</td>
                <td>{task.task_difficulty}</td>
                <td>{task.task_priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AvailableTasks;
