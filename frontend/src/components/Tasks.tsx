import React, { useState } from "react";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  const refreshTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/tasks", {
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
      <div>Tasks</div>
      <div>
        <button onClick={refreshTasks}>Refresh</button>{" "}
      </div>
      <div>
        <ul>
          {tasks.map((task) => (
            <li key={task.task_id}>
              <div>{task.task_name} </div>
              <div>{task.task_description}</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Tasks;
