import React, { useState, useEffect } from "react";

function Efficiency() {
  const [efficiency, setEfficiency] = useState(null);

  const getEfficiency = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/stats/efficiency",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to get efficiency");
      }
      const data = await response.json();
      setEfficiency(data.efficiency);
    } catch (error) {
      console.error("Error getting stats", error);
    }
  };

  return (
    <>
      <div>User Efficiency</div>
      <button onClick={getEfficiency}>Get stat</button>
      <div>{efficiency}</div>
    </>
  );
}

export default Efficiency;
