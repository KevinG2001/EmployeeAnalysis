import React, { useState } from "react";
import Style from "../../styles/EmployeeBox/createEmployee.module.scss";
function CreateEmployee() {
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isManager, setIsManager] = useState("");

  return (
    <>
      <div className={Style.container}>
        <div className={Style.row}>
          <input type="text" placeholder="Firstname" />
          <input type="text" placeholder="Surname" />
        </div>
        <div className={Style.row}>
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="DOB" />
        </div>
        <div className={Style.row}>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
        </div>
        <div className={Style.row}>
          <div>Manager?</div>
          <input type="checkbox" />
        </div>
        <div className={Style.row}>
          <button className={Style.submitBtn}>Submit</button>
        </div>
      </div>
    </>
  );
}

export default CreateEmployee;
