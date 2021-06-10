const bodyParser = require('body-parser');
const express = require('express');
require('dotenv').config()
const app = express();
const port = process.env.PORT

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.get('/', (req, res, next) => {
    res.send('ANJAYYYY');
})

const usersRoutes = require('./src/routes/usersRoute')
app.use('/v1/users', usersRoutes);

app.use((error, req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message || "Ada yang error bro";
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

app.listen(port, () => {
    console.log(`Running at http://localhost:${port}`)
})