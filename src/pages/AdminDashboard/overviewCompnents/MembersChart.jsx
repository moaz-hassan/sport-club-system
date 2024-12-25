import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register components for Chart.js v3/v4
ChartJS.register(
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const MembersChart = () => {
  // Chart Data
  const data = {
    labels: ["March", "April", "May", "June", "July"], // Last 5 months
    datasets: [
      {
        label: "Members Count",
        data: [50, 70, 85, 60, 90], // Replace with your data
        fill: false, // No area fill under the line
        borderColor: "rgba(75, 192, 192, 1)", // Line color
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Point hover background
        pointBorderColor: "rgba(75, 192, 192, 1)",
        pointBackgroundColor: "#fff",
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "rgba(75, 192, 192, 1)",
        pointHoverBorderColor: "rgba(220, 220, 220, 1)",
        pointRadius: 5,
        pointHitRadius: 10,
        tension: 0.4, // Curve the line
      },
    ],
  };

  // Chart Options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Members Count Over the Last 5 Months",
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Members",
        },
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default MembersChart;
