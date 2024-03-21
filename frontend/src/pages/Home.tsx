import React, { useState, useEffect } from "react";
import Styles from "../styles/home.module.scss";
import Efficency from "../components/statistics/Efficency";
import Overview from "../components/statistics/Overview";
import TaskBox from "../components/TaskBox/TaskBox";

function Home() {
  const [isAdmin, setIsAdmin] = useState(false); // State to track if user is admin
  const [firstname, setFirstName] = useState("");

  useEffect(() => {
    // Function to fetch token from wherever it's stored (like local storage)
    const token = localStorage.getItem("token"); // Assuming token is stored in local storage
    if (token) {
      // Decode token to access its payload
      const decodedToken = decodeToken(token);
      // Check if user is admin based on token payload
      if (decodedToken.isAdmin) {
        setIsAdmin(true);
      }
      setFirstName(decodedToken.firstName);
    }
  }, []);

  // Function to decode token
  const decodeToken = (token: any) => {
    // For demonstration purposes, assuming token payload is accessible directly
    //Can change later on but for now this works
    return JSON.parse(atob(token.split(".")[1])); // Decoding token payload
  };

  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.wrapper}>
          <p className={Styles.title}>Welcome {firstname}</p>
          <div className={Styles.boxContainer}>
            {/* Box 1 */}
            <div className={Styles.box}>
              <Overview />
            </div>
            {/* Box 2  */}
            <div className={Styles.box}>
              <Efficency />
            </div>
            {/* Box 3 */}
            <div className={Styles.box}>
              <TaskBox />
            </div>
            {/* Box 4 & 5 if admin */}
            {/* Conditionally render additional components based on user's permissions */}
            {isAdmin && (
              <>
                {/* <div className={Styles.box}>Admin Box 1</div> */}
                {/* <div className={Styles.box}>Admin Box 2</div> */}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
