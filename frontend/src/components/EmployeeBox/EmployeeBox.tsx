import React, { useState } from "react";
import Styles from "../../styles/Tasks.module.scss";
import EmployeeList from "./EmployeeList";
import CreateEmployee from "./CreateEmployee";
import { useUser } from "../../util/userUtil";

function EmployeeBox() {
  const user = useUser();
  const [panelPointer, setPanelPointer] = useState("All Employees");

  const panelComponents = {
    "All Employees": <EmployeeList />,
    "Create New Task": user?.isAdmin && <CreateEmployee />,
  };

  const handleClick = (e) => {
    const divName = e.target.textContent;
    setPanelPointer(divName);
  };

  return (
    <div className={Styles.container}>
      {/* Buttons */}
      <div className={Styles.sidebar}>
        {Object.keys(panelComponents).map(
          (panel, index) =>
            panelComponents[panel] && (
              <div key={index} onClick={handleClick} className={Styles.taskBtn}>
                {panel}
              </div>
            )
        )}
      </div>
      {/* Content */}
      <div className={Styles.contentPanel}>{panelComponents[panelPointer]}</div>
    </div>
  );
}

export default EmployeeBox;
