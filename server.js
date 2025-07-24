const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
//Espacio para Middlewares
const app = express();
const routes = require("./Routes/index");
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());
app.use(cookieParser());

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
})

app.use("/", routes);

module.exports= app;