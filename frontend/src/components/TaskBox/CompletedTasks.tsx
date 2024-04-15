import { useEffect, useState } from "react";
import Styles from "../../styles/Tasks.module.scss";
import { Task } from "../../types/taskType";

function CompletedTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

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
        <div className={Styles.taskHolder}>
          {tasks.map((task) => (
            <li key={task.task_id}>
              <div>{task.task_name}</div>
              <div>{task.task_description}</div>
            </li>
          ))}
        </div>
      </div>
    </>
  );
}

export default CompletedTasks;
