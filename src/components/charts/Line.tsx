import { Line } from "react-chartjs-2";

import { ChartOptions, ChartData } from "chart.js";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type LineChartType = {
  chartData: ChartData<"line", number[], string>
  chartOptions: ChartOptions<"line">
}

const LineChart = ({ chartData, chartOptions }: LineChartType) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-400 mb-4">Stock Close Price</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}
export default LineChart