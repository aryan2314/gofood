const express = require('express');
const cors =require('cors');
const app = express();
const port = 5002;
const mongoDB = require("./db");
const User = require('./models/User');
mongoDB();
app.use(cors())





// CORS middleware
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(express.json());
app.use('/api', require("./router/CreateUser"));
app.use('/api', require("./router/DisplayData"));
app.use('/api', require("./router/OrderData"));

app.get('/', (req, res) => {
  res.send('Hello world!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
