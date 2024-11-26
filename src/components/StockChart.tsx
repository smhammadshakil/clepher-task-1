import LineChart from "./charts/Line";

interface StockChartProps {
  data: {
    date: string;
    open: string;
    high: string;
    low: string;
    close: string;
  }[];
}

const StockChart: React.FC<StockChartProps> = ({ data }) => {
  // Prepare data for the chart
  const chartData = {
    labels: data.map((point) => point.date).reverse(), // Reverse to show oldest to newest
    datasets: [
      {
        label: "Close Price",
        data: data.map((point) => parseFloat(point.close)).reverse(),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.3,
      },
      {
        label: "Open Price",
        data: data.map((point) => parseFloat(point.open)).reverse(),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
        tension: 0.3,
      },
      {
        label: "Low Price",
        data: data.map((point) => parseFloat(point.low)).reverse(),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
        tension: 0.3,
      },
      {
        label: "High Price",
        data: data.map((point) => parseFloat(point.high)).reverse(),
        borderColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#4B5563",
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#374151",
        titleColor: "#E5E7EB",
        bodyColor: "#E5E7EB",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#4B5563",
        },
        grid: {
          color: "#D1D5DB",
        },
      },
      y: {
        ticks: {
          color: "#4B5563",
        },
        grid: {
          color: "#D1D5DB",
        },
      },
    },
  };

  return (
    <LineChart chartData={chartData} chartOptions={chartOptions} />
  );
};

export default StockChart;