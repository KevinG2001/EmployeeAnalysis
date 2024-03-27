import React, { useState } from "react";
import Styles from "../../styles/Tasks.module.scss";
import Productivity from "./Productivity";

function Efficency() {
  const [panelPointer, setPanelPointer] = useState("Productivity");

  const panelComponents: string = {
    Productivity: <Productivity />,
  };

  const handleClick = (e) => {
    const divName = e.target.textContent;
    setPanelPointer(divName);
  };

  return (
    <div className={Styles.container}>
      {/* Buttons */}
      <div className={Styles.sidebar}>
        {Object.keys(panelComponents).map((panel, index) => (
          <div key={index} onClick={handleClick} className={Styles.taskBtn}>
            {panel}
          </div>
        ))}
      </div>
      {/* Content */}
      <div className={Styles.contentPanel}>{panelComponents[panelPointer]}</div>
    </div>
  );
}

export default Efficency;
