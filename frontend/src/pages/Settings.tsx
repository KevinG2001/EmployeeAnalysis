import { useState } from "react";
import AccountDetails from "../components/Settings/AccountDetails";
import style from "../styles/Settings/Settings.module.scss";
import PersonalDetails from "../components/Settings/PersonalDetails";

function Settings() {
  const [activeButton, setActiveButton] = useState("account");
  return (
    <>
      <div className={style.container}>
        <div className={style.contentWrapper}>
          <div className={style.btnWrapper}>
            <button
              className={`${style.btn} ${
                activeButton === "account" ? style.active : ""
              }`}
              id={style.leftBtn}
              onClick={() => setActiveButton("account")}
            >
              Account Details
            </button>
            <button
              className={`${style.btn} ${
                activeButton === "personal" ? style.active : ""
              }`}
              id={style.rightBtn}
              onClick={() => setActiveButton("personal")}
            >
              Personal Details
            </button>
          </div>
          <div className={style.content}>
            {activeButton === "account" ? (
              <AccountDetails />
            ) : (
              <PersonalDetails />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
