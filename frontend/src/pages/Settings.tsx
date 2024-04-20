import React from "react";
import { useUser } from "../util/userUtil";
import Style from "../styles/SettingsPage/settings.module.scss";
import ProfilePic from "../assets/profilePicPlaceholder.svg";

function Settings() {
  const user = useUser();

  function goHome() {
    window.location.href = "/home";
  }

  const date = user?.dob.split("T")[0];
  const year = date?.split("-")[0];
  const month = date?.split("-")[1];
  const day = date?.split("-")[2];

  return (
    <>
      <div className={Style.container}>
        <div className={Style.wrapper}>
          <div className={Style.title}>Account</div>
          <div className={Style.imgWrapper}>
            <div className={Style.inputWrapper}>
              <div className={Style.inputTitle}>Profile Picture</div>
              <img
                src={ProfilePic}
                alt="ProfilePic"
                className={Style.profileImg}
              />
              <button>Change profile picture</button>
            </div>
          </div>
          <div className={Style.inputWrapper}>
            <div className={Style.inputTitle}>First Name</div>
            <input type="text" placeholder={user?.firstname} />
          </div>
          <div className={Style.inputWrapper}>
            <div className={Style.inputTitle}>Surname</div>
            <input type="text" placeholder={user?.surname} />
          </div>
          <div className={Style.inputWrapper}>
            <div className={Style.inputTitle}>Email </div>
            <div> {user?.email}</div>
          </div>
          <div className={Style.inputWrapper}>
            <div className={Style.inputTitle}>DOB: </div>
            <div>
              {day}-{month}-{year}
            </div>
          </div>
          <div className={Style.inputWrapper}>
            <div className={Style.inputTitle}>Username: </div>
            <div> {user?.username}</div>
          </div>
          <div className={Style.inputWrapper}>
            <div className={Style.inputTitle}>Password: </div>
            {Array.from({ length: user?.passwordLen ?? 0 }, () => "*").join("")}
          </div>
          <button onClick={goHome}>Home</button>
        </div>
      </div>
    </>
  );
}

export default Settings;
