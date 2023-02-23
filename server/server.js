const express = require('express');
const mongoose = require('mongoose');
const routers = require('./routers');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const { json } = require('body-parser');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(routers);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Origin", "Origin, X-Requested-With, Content-Type, Accept")
//   res.header("Access-Control-Allow-Origin", req.header('Origin'));
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   next();
// });

const port = process.env.PORT || 5000 ;
const CONN_URL = `mongodb://localhost:27017/Ecommerce`;

mongoose.connect(CONN_URL, { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false, }).then(() => {
    console.log('Database Connected');
})

http.createServer(app).listen(port , () => {
    console.log(`Listening on ${port}`);
})