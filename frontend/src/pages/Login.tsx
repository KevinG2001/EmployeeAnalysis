import { useState } from "react";
import Styles from "../styles/login/login.module.scss";

function login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className={Styles.loginContainer}>
        <div className={Styles.loginWrapper}>
          <div className={Styles.title}>Sign In</div>
          <div className={Styles.usernameBox}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={Styles.passwordBox}>
            <input
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={Styles.btnBox}>
            <button onClick={handleSubmit}>Sign In</button>
            <div>------ or ------</div>
            <button>Create Account</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default login;
