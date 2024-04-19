import { useEffect, useState } from "react";
import Styles from "../../styles/BoxCards/tasks.module.scss";
import listStyles from "../../styles/BoxCards/tableStyle.module.scss";
import { Task } from "../../types/taskType";

function CompletedTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      //Fetchs the tasks from backend
      const response = await fetch(
        "http://localhost:5000/api/tasks/completedTasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setTasks(data.tasks);
      setIsLoading(false);
    } catch (error) {
      console.error("Error refreshing tasks:", error);
    }
  };

  //Timer to refresh tasks every 5 minutes and automatically refresh it when mounted
  useEffect(() => {
    refreshTasks();

    const interval = setInterval(refreshTasks, 5 * 60 * 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className={Styles.container}>
        {isLoading ? (
          <p>Loading...</p>
        ) : tasks.length === 0 ? (
          <p>You have not completed any tasks</p>
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
    </>
  );
}

export default CompletedTasks;
