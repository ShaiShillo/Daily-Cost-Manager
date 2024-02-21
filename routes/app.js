const costRoutes = require('./costRoutes');
const express = require('express');
const app = express();

const PORT = 1500;

app.use('/', costRoutes);
app.use(express.json());
app.use(costRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// configure the MongoDB connection using Mongoose:
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
