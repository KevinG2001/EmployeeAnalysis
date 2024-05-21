import { useState } from "react";
import { useUser } from "../../util/userUtil";
import style from "../../styles/Settings/Details.module.scss";
import ProfilePic from "../../assets/profilePicPlaceholder.svg";

function AccountDetails() {
  const user = useUser();
  const [newFirstname, setNewFirstName] = useState("");
  const [newSurname, setNewSurname] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

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
      <div className={style.container}>
        <div className={style.wrapper}>
          <div className={style.imgWrapper}>
            <div className={style.inputWrapper}>
              <div className={style.inputTitle}>Profile Picture</div>
              <img
                src={ProfilePic}
                alt="ProfilePic"
                className={style.profileImg}
              />
              <button>Change profile picture</button>
            </div>
          </div>
          <div className={style.inputWrapper}>
            <div className={style.inputTitle}>First Name</div>
            <input
              type="text"
              placeholder={user?.firstname}
              value={newFirstname}
              onChange={(e) => setNewFirstName(e.target.value)}
            />
          </div>
          <div className={style.inputWrapper}>
            <div className={style.inputTitle}>Surname</div>
            <input
              type="text"
              placeholder={user?.surname}
              value={newSurname}
              onChange={(e) => setNewSurname(e.target.value)}
            />
          </div>
          <div className={style.inputWrapper}>
            <div className={style.inputTitle}>Email </div>
            <div> {user?.email}</div>
          </div>
          <div className={style.inputWrapper}>
            <div className={style.inputTitle}>DOB: </div>
            <div>
              {day}-{month}-{year}
            </div>
          </div>
          <div className={style.inputWrapper}>
            <div className={style.inputTitle}>Username: </div>
            <input
              type="text"
              placeholder={user?.username}
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </div>
          <div className={style.inputWrapper}>
            <div className={style.inputTitle}>Password: </div>

            <input
              type="password"
              placeholder={Array.from(
                { length: user?.passwordLen ?? 0 },
                () => "*"
              ).join("")}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className={style.btnWrapper}>
            <button onClick={saveChanges}>Save Changes</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountDetails;
