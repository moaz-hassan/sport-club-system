import {
  Chart as ChartJS,
  BarElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register components (needed for Chart.js v3+)
ChartJS.register(BarElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const SubscriptionChart = () => {
  // Chart data
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Subscriptions',
        data: [2, 2, 1, 5, 7, 4, 10], // Replace these numbers with your data
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)', // Red
          'rgba(255, 159, 64, 0.2)', // Orange
          'rgba(255, 205, 86, 0.2)', // Yellow
          'rgba(75, 192, 192, 0.2)', // Green
          'rgba(54, 162, 235, 0.2)', // Blue
          'rgba(153, 102, 255, 0.2)', // Purple
          'rgba(201, 203, 207, 0.2)', // Grey
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(201, 203, 207, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      title: {
        display: true,
        text: 'Subscription Count Over Last 7 Months',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10, // Adjust for better readability
        },
      },
    },
  };

  return (
      <Bar data={data} options={options} />
  );
};

export default SubscriptionChart;
