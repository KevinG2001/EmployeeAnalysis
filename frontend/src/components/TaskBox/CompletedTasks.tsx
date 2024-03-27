import React, { useState } from "react";
import Styles from "../../styles/Tasks.module.scss";

function CompletedTasks() {
  const [tasks, setTasks] = useState([]);

  const refreshTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      //Fetchs the tasks from backend
      const response = await fetch("http://localhost:5000/completedTasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setTasks(data.tasks);
    } catch (error) {
      console.error("Error refreshing tasks:", error);
    }
  };
  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.title}></div>
        <div className={Styles.btnHolder}>
          <button onClick={refreshTasks}>Refresh Tasks</button>
        </div>
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
