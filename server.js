const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve your existing HTML + assets
app.use(express.static(__dirname));

// Add CORS support
app.use(cors({
  origin: 'https://www.hiddenrivers.ca'
}));

// Handle the form POST
app.post('/subscribe', (req, res) => {
  const email = req.body.email;

  if (!email || !email.includes('@')) {
    return res.status(400).send('Please enter a valid email address.');
  }

  fs.appendFile('emails.txt', email + '\n', err => {
    if (err) {
      console.error(err);
      return res.status(500).send('Something went wrong.');
    }

    res.send('Excited to explore Toronto with you!');
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

// Test: GitHub Actions deployment workflow
