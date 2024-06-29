import Styles from "../../../styles/BoxCards/tasks.module.scss";
import listStyles from "../../../styles/BoxCards/tableStyle.module.scss";
import useTasks from "../../../util/taskUtil";
import { useState } from "react";
import TaskModal from "../TaskModal";

function Tasks() {
  const { tasks, isLoading } = useTasks("assignedtasks");
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (task: any) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

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
              <tr key={task.task_id} onClick={() => handleRowClick(task)}>
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
      {isModalOpen && (
        <TaskModal task={selectedTask} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default Tasks;
