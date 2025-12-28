require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json()); // pour parser le JSON des requêtes POST

const spreadsheet = require('./routes/spreadsheetRoute');

app.use('/api/spreadsheet', spreadsheet);


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
