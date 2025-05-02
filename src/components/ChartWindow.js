import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import html2canvas from "html2canvas";

const modelDisplayNames = {
  lasso: "Lasso",
  ffnn: "FFNN",
  rnn: "RNN (GRU)"
};

const ChartWindow = ({ selectedModels, chartData, dateLabels }) => {
  const [showILIRates, setShowILIRates] = useState(true);
  if (!chartData) {
    return <p>Loading chart data...</p>;
  }

  const colors = {
    lasso: "#0072B2",
    ffnn: "#E69F00",
    rnn: "#009E73",
  };

  const { ili: ili_rates, ...modelPredictions } = chartData;

  const formattedData = ili_rates.map((ili, index) => {
    const row = {
      date: dateLabels[index] || index,
      "ILI Rates": ili,
    };

    selectedModels.forEach((model) => {
      row[model] = modelPredictions[model]?.[index] || 0;
    });

    return row;
  });

  console.log("Formatted chart data:", formattedData);

  const exportChart = () => {
    console.log("click");
    const chartElement = document.getElementById("chart-container");
    if (chartElement) {
      html2canvas(chartElement).then((canvas) => {
        // convert canvas to image
        const imgData = canvas.toDataURL("image/png");

        // create a link element to trigger the download
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "chart.png"; // change the extension to .jpg if needed
        link.click();
      });
    }
  };

  return (
    <div className="w-full max-w-4xl p-4 border rounded-lg shadow-md bg-white mt-4">
      <h2 className="text-lg font-semibold text-center mb-3">Model Visualiser</h2>

      <div id="chart-container">
        <ResponsiveContainer width="100%" height={800}>
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => date}
              minTickGap={20}
              height={50}
            />
            <YAxis label={{ value: "ILI Rates", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Legend />
            {showILIRates && (
              <Line
                name="Actual ILI Rates"
                type="monotone"
                dataKey="ILI Rates"
                stroke="#000000"
                strokeWidth={2.5}
                dot={false}
              />
            )}
            {selectedModels.map((model) => (
              <Line
                name={modelDisplayNames[model] || model}
                key={model}
                type="monotone"
                dataKey={model}
                stroke={colors[model.toLowerCase()] || "#000"}
                strokeWidth={2.5}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
        <div className="flex justify-end mt-1 mb-3">
          <input
            type="checkbox"
            id="toggle-ili"
            checked={showILIRates}
            onChange={() => setShowILIRates(!showILIRates)}
          />
          <label htmlFor="toggle-ili" className="text-sm">
            Show actual ILI rates
          </label>
      </div>
      <div className="absolute bottom-4 left-4 flex items-center space-x-2">
          <button
            onClick={exportChart}
            className="btn btn-outline-dark"
          >
            Export as PNG
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChartWindow;
