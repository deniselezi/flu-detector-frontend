import React, { useState } from "react";
import { Table, Button, Form } from "react-bootstrap";


const modelDisplayNames = {
    lasso: "Lasso",
    ffnn: "FFNN",
    rnn: "RNN (GRU)"
  };

function ResultsTable({ chartData, selectedModels, dateLabels }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  if (!chartData || !chartData["ili"] || chartData["ili"].length === 0) {
    return <p>No data available</p>;
  }

  const totalRows = chartData["ili"].length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const startIndex = currentPage * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalRows);

  const visibleDates = dateLabels.slice(startIndex, endIndex);

  const exportToCSV = () => {
    if (!chartData || !chartData["ili"] || chartData["ili"].length === 0) return;
  
    const headers = ["Date", ...selectedModels.map(model => modelDisplayNames[model] || model)];
  
    const totalRows = chartData["ili"].length;
    const rows = Array.from({ length: totalRows }, (_, idx) => {
      const row = [dateLabels[idx]];
      selectedModels.forEach((model) => {
        const val = chartData[model]?.[idx];
        row.push(val !== undefined ? val : 0);
      });
      return row;
    });
  
    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");
  
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "model_predictions_all_rows.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h3 className="mb-3">Raw Scores</h3>

      <div className="d-flex justify-content-end mb-2">
        <Button variant="outline-dark" onClick={exportToCSV}>
            Export to CSV
        </Button>
    </div>

      {/* Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Date</th>
            {selectedModels.map((model) => (
              <th key={model}>{modelDisplayNames[model]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleDates.map((date, idx) => (
            <tr key={date}>
              <td>{date}</td>
              {selectedModels.map((model) => (
                <td key={model}>
                  {chartData[model] && chartData[model][startIndex + idx] !== undefined
                    ? chartData[model][startIndex + idx]
                    : "0"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

    {/* Pagination Controls */}
    <div className="d-flex justify-content-between align-items-center mb-2">

      <div>
          <Button
            variant="outline-dark"
            disabled={currentPage === 0}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            className="me-2"
          >
            Previous
          </Button>
          <Button
            variant="outline-dark"
            disabled={currentPage >= totalPages - 1}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
          >
            Next
          </Button>
        </div>

        <div>
          <Form.Select
            size="sm"
            style={{ width: "auto", display: "inline-block" }}
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(parseInt(e.target.value));
              setCurrentPage(0); // reset to first page
            }}
          >
            {[10, 20, 50, 100].map((num) => (
              <option key={num} value={num}>
                Show {num}
              </option>
            ))}
          </Form.Select>
        </div>
      </div>

      {/* Page Info */}
      <div className="text-center text-muted">
        Page {currentPage + 1} of {totalPages}
      </div>
    </div>
  );
}

export default ResultsTable;