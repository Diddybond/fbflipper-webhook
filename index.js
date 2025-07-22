const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  const token = req.query.verification_token;
  if (token) {
    return res.send(token);
  }
  res.status(400).send('Missing verification token');
});

app.post('/', (req, res) => {
  console.log('POST received:', req.body);
  res.send('Received');
});

app.listen(PORT, () => console.log(`Webhook running on port ${PORT}`));
