require('dotenv').config();
const express = require('express');
const app = express();
const connectDb = require('./config/db');
const authRoute = require('./routers/auth-router')
const cors = require('cors')

const port = process.env.SERVER_PORT || 8000;

// DB Connection
connectDb();

// Middleware
app.use(express.json());

// Configure CORS
app.use(cors({
  origin: "http://localhost:3000", // Allow requests from this origin
  credentials: true // Allow cookies to be sent along with requests
}));

// Routes
app.use('/api/auth', authRoute );

app.get('/', (req, res) => {
    res.send("Server home page");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
