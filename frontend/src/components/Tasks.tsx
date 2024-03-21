import React, { useEffect, useState } from "react";
import Styles from "../styles/BoxCards/tasks.module.scss";
function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const refreshTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      //Fetchs the tasks from backend
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

  useEffect(() => {
    // Function to fetch token from wherever it's stored (like local storage)
    const token = localStorage.getItem("token"); // Assuming token is stored in local storage
    if (token) {
      // Decode token to access its payload
      const decodedToken = decodeToken(token);
      // Check if user is admin based on token payload
      if (decodedToken.isAdmin) {
        setIsAdmin(true);
      }
    }
  }, []);

  // Function to decode token
  const decodeToken = (token: any) => {
    // For demonstration purposes, assuming token payload is accessible directly
    //Can change later on but for now this works
    return JSON.parse(atob(token.split(".")[1])); // Decoding token payload
  };
  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.title}></div>
        <div className={Styles.btnHolder}>
          <button onClick={refreshTasks}>Refresh Tasks</button>
          {isAdmin && (
            <>
              <button>Create New Task</button>
            </>
          )}
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

export default Tasks;
