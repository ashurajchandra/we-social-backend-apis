const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const routes = require('./routes');
const app = express();
const port = 8080;
dotenv.config()
const mongoConnectionUrl=process.env.MONGO_URL


const corsOption={
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
        'Authorization',
      ],
      exposedHeaders:[
        'Content-Range'
      ],
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    preflightContinue: false,
  }
//middleware
app.use(cors(corsOption));
app.options('*', cors(corsOption));
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.get('/',(req,res)=>{
    res.send('Hello world')
})
app.use('/routes',routes)
mongoose
.connect(mongoConnectionUrl,
  {useNewUrlParser: true,useUnifiedTopology:true }
).then(()=>{
    app.listen(port, ()=>{
        console.log(`Server is up and running on port ${port}`)
    })
});

