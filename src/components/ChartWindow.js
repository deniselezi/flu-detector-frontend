import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ChartWindow = ({ selectedModel, chartData }) => {
  if (!chartData) {
    return <p>Loading chart data...</p>;
  }

  const { preds: predictions, ili: ili_rates } = chartData;

  const formattedData = predictions.map((pred, index) => ({
    index,
    Prediction: pred,
    "ILI Rates": ili_rates[index] || 0,
  }));

  console.log("Formatted chart data:", formattedData);

  return (
    <div className="w-full max-w-4xl p-4 border rounded-lg shadow-md bg-white mt-4">
      <h2 className="text-lg font-semibold text-center mb-2">{selectedModel} - Chart</h2>
      <ResponsiveContainer width="100%" height={800}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="index" label={{ value: "Time", position: "insideBottom", offset: -5 }} tickFormatter={() => ""} />
          <YAxis label={{ value: "Value", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Prediction" stroke="#8884d8" strokeWidth={2} />
          <Line type="monotone" dataKey="ILI Rates" stroke="#82ca9d" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartWindow;
