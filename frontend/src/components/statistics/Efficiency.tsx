import { useState } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement
);

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
      <Line
        data={{
          labels: ["A", "B", "C"],
          datasets: [
            {
              label: "Efficiency",
              data: [200, 400, 600],
            },
          ],
        }}
      />
      <div>User Efficiency</div>
      <button onClick={getEfficiency}>Get stat</button>
      <div>{efficiency}</div>
    </>
  );
}

export default Efficiency;
