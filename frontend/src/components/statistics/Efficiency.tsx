import { useEffect, useState } from "react";
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
  const [overallEfficiency, setoverallEfficiency] = useState(null);
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
      setoverallEfficiency(data.overallEfficiency);
      setEfficiency(data.efficiencies);
    } catch (error) {
      console.error("Error getting stats", error);
    }
  };

  useEffect(() => {
    getEfficiency();

    const interval = setInterval(getEfficiency, 5 * 60 * 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {efficiency && (
        <Line
          data={{
            labels: efficiency.map((data) => data.task_name),
            datasets: [
              {
                label: "Efficiency",
                data: efficiency.map((data) => data.efficiency),
              },
            ],
          }}
        />
      )}
      <div>Overall Effiency: {overallEfficiency}</div>
    </>
  );
}

export default Efficiency;
