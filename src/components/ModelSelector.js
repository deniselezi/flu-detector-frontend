import React from "react";
import Form from 'react-bootstrap/Form';

const models = [
    "Lasso",
    "FFNN",
    "RNN (GRU)"
];

const ModelSelector = ({ selectedModel, setSelectedModel }) => {
  return (
    <Form>
      <h2 className="text-lg font-semibold text-center mb-2">Select model</h2>
      <div className="flex flex-col space-y-2">
        {models.map((model) => (
        <Form.Check // prettier-ignore
        type="radio"
        id={`${model}-radio`}
        label={model}
        checked={selectedModel === model}
        onChange={() => setSelectedModel(model)}
        />
        ))}
      </div>
    </Form>
  );
};

export default ModelSelector;
