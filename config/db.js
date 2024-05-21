const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

function mongosh() {
    mongoose
        .connect(process.env.mongo)
        .then(() => {
            console.log("Database is connected");
        })
        .catch((err) => {
            console.log("Connection error -----> ", err);
        })
}

module.exports = mongosh;