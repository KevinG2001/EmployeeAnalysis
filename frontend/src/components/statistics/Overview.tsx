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
          <div>This is where the overview box will go</div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt
            deleniti quibusdam praesentium dolorem esse inventore, ipsum, sed,
            officiis autem animi suscipit debitis ipsa maxime sapiente modi a
            laborum quisquam obcaecati!
          </div>
        </div>
      </div>
    </>
  );
}

export default Overview;
