import React, { useEffect, useState } from "react";
import Styles from "../../styles/BoxCards/tasks.module.scss";
import CreateTaskModal from "../TaskBox/CreateTaskModal";
import { useUser } from "../../util/userUtil";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const user = useUser();

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

  const openCreateTaskModal = () => {
    setOpenModal(true);
  };

  const closeCreateTaskModal = () => {
    setOpenModal(false);
  };
  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.title}></div>
        <div className={Styles.btnHolder}>
          <button onClick={refreshTasks}>Refresh Tasks</button>
          {user?.isAdmin && (
            <>
              <button onClick={openCreateTaskModal}>Create New Task</button>
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
      <CreateTaskModal isOpen={openModal} closeModal={closeCreateTaskModal} />
    </>
  );
}

export default Tasks;
