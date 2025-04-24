import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Calendar from "./components/Calendar";
import ChartWindow from "./components/ChartWindow";
import ModelSelector from "./components/ModelSelector";
import Navigation from "./components/Navigation";

import 'bootstrap/dist/css/bootstrap.css';

const App = () => {
  const server = "http://127.0.0.1:5000";
  const [selectedModel, setSelectedModel] = useState("Lasso");
  const [chartData, setChartData] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: new Date("2017-09-01"),
    endDate: new Date("2019-08-31"),
  });

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const params = new URLSearchParams({
          model: selectedModel,
          ...(dateRange.startDate && { start_date: dateRange.startDate.toISOString().split("T")[0] }),
          ...(dateRange.endDate && { end_date: dateRange.endDate.toISOString().split("T")[0] }),
        });
        const request = `${server}/get_chart?${params}`
        console.log(request)
        const response = await fetch(request);
        if (!response.ok) {
          throw new Error("Failed to fetch chart data");
        }
        const data = await response.json();
        console.log("Fetched chart data:", data); // Log API response
        setChartData(data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, [selectedModel, dateRange.startDate, dateRange.endDate]);

  return (
    <div className="flex flex-col h-screen">
      <Navigation />
      <div className="flex flex-col items-center p-4">
        <ChartWindow selectedModel={selectedModel} chartData={chartData} />
        <ModelSelector selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
        <Calendar onDateRangeChange={setDateRange} />
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
