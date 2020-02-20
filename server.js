// import express
const express = require('express');
const connectDB = require('./config/db');

// intialize express
const app = express();

// Connect Database
connectDB();

// Init Middleware
// By doing extended false now you can accept body data
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ msg: 'Welcome to the contact keeper API' }));

// DEFINE ROUTES
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));