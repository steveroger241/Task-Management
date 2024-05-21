const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, trim: true }
}, { timestamps: true });

const authModel = mongoose.model('auth', authSchema);

module.exports = authModel;