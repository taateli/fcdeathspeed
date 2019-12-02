const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to DB
connectDB();
// Init bodyparser
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Server running'));

// // Define our routes
// app.use('/api/matches', require('./routes/api/matches'));
app.use('/api/players', require('./routes/api/players'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started, PORT ${PORT}`));
