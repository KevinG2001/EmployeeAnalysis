import React from "react";

function Overview() {
  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");
    // Redirect the user to the login page or any other desired location
    window.location.href = "/";
  };
  return (
    <>
      <div>
        <div>
          <button onClick={handleLogout}>Logout</button>
          <div>Tasks completed</div>
          <div>Fasted Task completed: </div>
        </div>
      </div>
    </>
  );
}

export default Overview;
