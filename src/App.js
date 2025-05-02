import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Calendar from "./components/Calendar";
import ChartWindow from "./components/ChartWindow";
import ModelSelector from "./components/ModelSelector";
import Navigation from "./components/Navigation";
import ResultsTable from "./components/ResultsTable";

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from "react-bootstrap";

const App = () => {
  const server = "http://127.0.0.1:5000";  // localhost. make sure flask server is running.
  const [selectedModels, setSelectedModels] = useState(["lasso"]);
  const [chartData, setChartData] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: new Date("2017-09-01"),
    endDate: new Date("2019-08-31"),
  });

  const getDateLabels = (start, end) => {
    const dates = [];
    const current = new Date(start);
    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates.map(date => date.toISOString().split("T")[0]);
  };
  
  const dateLabels = getDateLabels(dateRange.startDate, dateRange.endDate);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const params = new URLSearchParams({
          models: selectedModels.join(","),
          ...(dateRange.startDate && { start_date: dateRange.startDate.toISOString().split("T")[0] }),
          ...(dateRange.endDate && { end_date: dateRange.endDate.toISOString().split("T")[0] }),
        });
        const request = `${server}/get_chart?${params}`;
        console.log(request);
        const response = await fetch(request);
        if (!response.ok) {
          throw new Error("Failed to fetch chart data");
        }
        const data = await response.json();
        console.log("Fetched chart data:", data);
        setChartData(data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, [selectedModels, dateRange.startDate, dateRange.endDate]);

  return (
    <div className="flex flex-col h-screen">
      <Navigation />
      <Container className="mt-4 px-4">
        <Row className="mb-4">
          <Col className="p-3">
            <ChartWindow
              selectedModels={selectedModels}
              chartData={chartData}
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
              dateLabels={dateLabels}
            />
          </Col>
        </Row>
        <Row className="mt-4 mb-4">
          <Col md={6} className="p-3">
            <ModelSelector
              selectedModels={selectedModels}
              setSelectedModels={setSelectedModels}
            />
          </Col>
          <Col md={6} className="p-3">
            <Calendar onDateRangeChange={setDateRange} />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col className="p-3">
            <ResultsTable
            chartData={chartData}
            selectedModels={selectedModels}
            dateLabels={dateLabels}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);

export default App;