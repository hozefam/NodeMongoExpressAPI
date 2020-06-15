const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

console.log(process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log('Connection Successful');
    },
    (err) => {
      console.log('Connection Refused', err);
    }
  );

const products = require('./routes/products');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/products', products);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} `);
});
