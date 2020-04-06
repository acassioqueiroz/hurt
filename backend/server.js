const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('requiredir');
const cors = require('cors');


const app = express();

mongoose.connect('mongodb://localhost:27017/nodeapi', { useUnifiedTopology: true,  useNewUrlParser: true } )
requireDir('./src/models');

app.use(cors());
app.use(express.json());
app.use('/api',require("./routes"))



app.listen(3002);