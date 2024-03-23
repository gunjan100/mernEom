require('dotenv').config();
const express = require('express');
const app = express();
const connectDb = require('./config/db');
const authRoute = require('./routers/auth-router')
const cateRoute = require('./routers/categorey-router')
const productRoute = require('./routers/product-router')
const cors = require('cors')

const port = process.env.SERVER_PORT || 8000;

// DB Connection
connectDb();



// Configure CORS
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    // other options...
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoute );
app.use('/api/categorey', cateRoute)
app.use('/api/product', productRoute)

app.get('/', (req, res) => {
    res.send("Server home page");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
