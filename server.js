const express = require('express');
const app = express();
const mongoosed = require('./config/db.js');
const cors = require('cors');
const path = require('path');

const dotenv = require('dotenv');
dotenv.config();

mongoosed();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, './client/build')));

const authroutes = require('./routes/authRoutes.js');
const taskroutes = require('./routes/taskRoutes.js');

app.use('/auth', authroutes);
app.use('/task', taskroutes);

app.use('*', (req, res)=>{
    res.sendFile(path.join(__dirname, './client/build/index.html'));
})

app.listen(process.env.port);