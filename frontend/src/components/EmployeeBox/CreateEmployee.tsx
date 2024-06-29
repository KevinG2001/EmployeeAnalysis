import { useState } from "react";
import Style from "../../styles/EmployeeBox/createEmployee.module.scss";
function CreateEmployee() {
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isManager, setIsManager] = useState(false);

  const createEmployee = () => {
    const token = localStorage.getItem("token");
    const data = {
      firstname: firstname,
      surname: surname,
      email: email,
      dob: dob,
      username: username,
      password: password,
      isManager: isManager,
    };

    fetch("http://localhost:5000/api/employees/createEmployee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create employee");
        }
      })
      .catch((error) => {
        console.log("Error Creating employee", error);
      });
  };

  return (
    <>
      <div className={Style.container}>
        <div className={Style.row}>
          <input
            type="text"
            placeholder="Firstname"
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Surname"
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
        <div className={Style.row}>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="DOB"
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div className={Style.row}>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={Style.row}>
          <div>Manager?</div>
          <input
            type="checkbox"
            checked={isManager}
            onChange={(e) => setIsManager(e.target.checked)}
          />
        </div>
        <div className={Style.row}>
          <button className={Style.submitBtn} onClick={createEmployee}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateEmployee;
