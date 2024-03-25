import { useState } from "react";
import Style from "../../styles/tasks/CreateTask.module.scss";

function CreateTask() {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSumbit = () => {
    const token = localStorage.getItem("token");
    const data = {
      name: name,
      priority: priority,
      difficulty: difficulty,
      dueDate: dueDate,
      description: description,
    };

    fetch("http://localhost:5000/createTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to submit task");
        }
        console.log("Task submitted");
        setName("");
        setPriority("");
        setDifficulty("");
        setDueDate("");
        setDescription("");
      })
      .catch((error) => {
        console.log("Error Submitting task:", error);
      });

    console.log(name, priority, difficulty, dueDate, description);
  };

  return (
    <>
      <div className={Style.container}>
        <div className={Style.row}>
          <input
            type="text"
            placeholder="Name"
            className={Style.inputBox}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Priority"
            className={Style.inputBox}
            onChange={(e) => setPriority(e.target.value)}
          />
        </div>
        <div className={Style.row}>
          <input
            type="text"
            placeholder="Estimated Difficulty"
            className={Style.inputBox}
            onChange={(e) => setDifficulty(e.target.value)}
          />
          <input
            type="text"
            placeholder="Due Date (YYYY-MM-DD)"
            className={Style.inputBox}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className={Style.desRow}>
          <textarea
            placeholder="Description"
            className={Style.inputBox}
            id={Style.desBox}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={Style.row}>
          <div className={Style.btnWrapper}>
            <button className={Style.submitBtn} onClick={handleSumbit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateTask;
