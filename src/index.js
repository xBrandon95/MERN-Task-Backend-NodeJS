const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./config/db');
require('dotenv').config();

// create server
const app = express();

// connection db
db();

// enable cors
app.use(cors());

// enable express.json
app.use(express.json({ extended: true }));

// use morgan
app.use(morgan('dev'));

// Port the app
const PORT = process.env.PORT || 4000;

// import routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));

// run server
app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
