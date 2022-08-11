const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();
const URI = process.env.MONGO_URI;

const auth = require('./middleware/auth');
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauces');

const app = express();

mongoose.connect(URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully!'))
.catch(() => console.log('Failed to connect to MongoDB...'));

app.use(express.json());
app.use(helmet({
    crossOriginResourcePolicy: false
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', auth, sauceRoutes);

module.exports = app;