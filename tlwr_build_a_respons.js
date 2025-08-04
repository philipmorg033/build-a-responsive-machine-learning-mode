// Import required libraries
const ml = require('@teachable/machine-learning');
const express = require('express');
const app = express();
const port = 3000;

// Define a simple machine learning model
class ModelMonitor {
  async initialize() {
    this.model = await ml.getModel('my_model');
  }

  async predict(input) {
    return this.model.predict(input);
  }
}

// Create a new instance of the model monitor
const modelMonitor = new ModelMonitor();

// Initialize the model
modelMonitor.initialize();

// Define API endpoints
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/predict', async (req, res) => {
  try {
    const input = req.body.input;
    const prediction = await modelMonitor.predict(input);
    res.json({ prediction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/metrics', async (req, res) => {
  try {
    const metrics = await modelMonitor.model.getMetrics();
    res.json(metrics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});