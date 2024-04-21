import React, { useState } from "react";
import { useUser } from "../util/userUtil";
import Style from "../styles/SettingsPage/settings.module.scss";
import ProfilePic from "../assets/profilePicPlaceholder.svg";

function Settings() {
  const user = useUser();
  const [newFirstname, setNewFirstName] = useState("");
  const [newSurname, setNewSurname] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  function goHome() {
    window.location.href = "/home";
  }

  const date = user?.dob.split("T")[0];
  const year = date?.split("-")[0];
  const month = date?.split("-")[1];
  const day = date?.split("-")[2];

  const saveChanges = () => {
    try {
      const token = localStorage.getItem("token");
      const data = {
        newFirstname: newFirstname,
        newSurname: newSurname,
        newUsername: newUsername,
        newPassword: newPassword,
      };

      fetch("http://localhost:5000/api/user/saveAccountSettings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to save changes");
          }
        })
        .catch((error) => {
          console.log("Error saving changes", error);
        });
    } catch (error) {
      console.log("Error saving changes", error);
    }
  };

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
            <input
              type="text"
              placeholder={user?.firstname}
              value={newFirstname}
              onChange={(e) => setNewFirstName(e.target.value)}
            />
          </div>
          <div className={Style.inputWrapper}>
            <div className={Style.inputTitle}>Surname</div>
            <input
              type="text"
              placeholder={user?.surname}
              value={newSurname}
              onChange={(e) => setNewSurname(e.target.value)}
            />
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
            <input
              type="text"
              placeholder={user?.username}
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </div>
          <div className={Style.inputWrapper}>
            <div className={Style.inputTitle}>Password: </div>

            <input
              type="text"
              placeholder={Array.from(
                { length: user?.passwordLen ?? 0 },
                () => "*"
              ).join("")}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className={Style.btnWrapper}>
            <button onClick={goHome}>Home</button>
            <button onClick={saveChanges}>Save Changes</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
