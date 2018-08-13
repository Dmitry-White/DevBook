const express = require('express');
const mongoose = require('mongoose');

const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World!'));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server runnning on port ${port}`));