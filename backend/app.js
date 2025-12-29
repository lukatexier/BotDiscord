require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json()); // pour parser le JSON des requêtes POST

const spreadsheet = require('./routes/spreadsheetRoute');

app.use('/api/spreadsheet', spreadsheet);


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
