import React from "react";

function Overview() {
  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Redirect the user to the login page or any other desired location
    window.location.href = "/";
  };
  return (
    <>
      <div>
        <div>
          <div>Logout modal now on profile pic</div>
        </div>
      </div>
    </>
  );
}

export default Overview;
