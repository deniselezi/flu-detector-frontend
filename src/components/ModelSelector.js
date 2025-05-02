import React from "react";
import Form from 'react-bootstrap/Form';

const models = [
  "lasso",
  "ffnn",
  "rnn"
];

const modelDisplayNames = {
  lasso: "Lasso",
  ffnn: "FFNN",
  rnn: "RNN (GRU)"
};

const ModelSelector = ({ selectedModels, setSelectedModels }) => {
  const toggleModel = (model) => {
    if (selectedModels.includes(model)) {
      setSelectedModels(selectedModels.filter((m) => m !== model));
    } else {
      setSelectedModels([...selectedModels, model]);
    }
  };

  return (
    <Form>
      <h3 className="text-lg font-semibold">Select models to visualise</h3>
      <div className="flex flex-col space-y-2 mt-4">
        {models.map((model) => (
          <Form.Check
            key={model}
            type="checkbox"
            id={`${model}-checkbox`}
            label={modelDisplayNames[model]}
            checked={selectedModels.includes(model)}
            onChange={() => toggleModel(model)}
          />
        ))}
      </div>
    </Form>
  );
};

export default ModelSelector;
