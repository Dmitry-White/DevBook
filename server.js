const express = require('express');
const mongoose = require('mongoose');

const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const users = require('./routes/api/users');

const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Main route
app.get('/', (req, res) => res.send('Hello World!'));

// Use routes
app.use('/api/posts', posts);
app.use('/api/profile', profile);
app.use('/api/users', users);

// Launch sequence
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server runnning on port ${port}`));