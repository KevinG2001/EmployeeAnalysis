import React, { useEffect, useState } from "react";
import Styles from "../../styles/BoxCards/tasks.module.scss";
import listStyles from "../../styles/BoxCards/tableStyle.module.scss";
import { Task } from "../../types/taskType";

function AvailableTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const refreshTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      //Fetchs the tasks from backend
      const response = await fetch(
        "http://localhost:5000/api/tasks/availabletasks",
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
        <div className={Styles.title}></div>
        <table className={listStyles.listContainer}>
          <tr>
            <th>Task Name</th>
            <th>Task Description</th>
            <th>Difficulty</th>
            <th>Priority</th>
          </tr>

          {tasks.map((task) => (
            <tr key={task.task_id}>
              <td>{task.task_name}</td>
              <td>{task.task_description}</td>
              <td>{task.task_difficulty}</td>
              <td>{task.task_priority}</td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
}

export default AvailableTasks;
