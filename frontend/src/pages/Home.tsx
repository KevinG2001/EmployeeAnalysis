import React, { useState, useEffect } from "react";
import Styles from "../styles/home.module.scss";
import Efficency from "../components/statistics/Efficency";
import Overview from "../components/statistics/Overview";

function Home() {
  const [isAdmin, setIsAdmin] = useState(false); // State to track if user is admin

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
    }
  }, []);

  // Function to decode token
  const decodeToken = (token: any) => {
    // Implement token decoding logic here (e.g., using jwt-decode library)
    // For demonstration purposes, assuming token payload is accessible directly
    return JSON.parse(atob(token.split(".")[1])); // Decoding token payload
  };

  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.wrapper}>
          <p className={Styles.title}>Welcome Username</p>
          <div className={Styles.boxContainer}>
            <div className={Styles.box}>
              <Overview />
            </div>
            <div className={Styles.box}>
              {isAdmin ? <Efficency /> : <div>Restricted Component</div>}
            </div>
            {/* Conditionally render additional components based on user's permissions */}
            {isAdmin && (
              <>
                <div className={Styles.box}>Admin Box 1</div>
                <div className={Styles.box}>Admin Box 2</div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
